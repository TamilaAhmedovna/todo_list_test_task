import { DragDropContext, Draggable, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd'
import { TaskType } from '../models/models'
import Task from './task'
import { ChangeEvent, TouchEvent, useCallback, useEffect, useState } from 'react'
import { mutliDragAwareReorder, multiSelectTo as multiSelect } from "../utils/utils";

type PropsType = {
  tasks: TaskType[]
  onRemoveTask: (id: string) => void
  onCompleteChanged: (id: string, isCompleted: boolean, e: ChangeEvent<HTMLInputElement>) => void
  onUpdateTasks: (tasks: TaskType[]) => void
  todoId: string
}

function Tasks(props: PropsType) {
  const { tasks, onRemoveTask, onCompleteChanged, onUpdateTasks, todoId } = props
  const PRIMARY_BUTTON_NUMBER = 0
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  /**
   * On window click
   */
  const onWindowClick = useCallback((e: MouseEvent) => {
    console.log('onWindowClick')
    if (e.defaultPrevented) {
      console.log('onWindowClick --> defaultPrevented')
      return;
    }
  
    console.log('all tasks unselected')

    setSelectedTaskIds([]);
  }, []);

  /**
   * On window key down
   */
  const onWindowKeyDown = useCallback((e: { defaultPrevented: any; key: string; }) => {
    if (e.defaultPrevented) {
      return;
    }

    if (e.key === "Escape") {
      setSelectedTaskIds([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, []);


  // a little function to help us with reordering the result
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    onUpdateTasks(items)
  }

  const getListStyle = (isDraggingOver: boolean) => ({
  });
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',

    // styles we need to apply on draggables
    ...draggableStyle,
  });


  /**
   * On before capture
   */
  const onBeforeCapture = (start: { draggableId: any; }) => {
    console.log('onBeforeCapture')
    const draggableId = start.draggableId;
    const selected = selectedTaskIds.find((taskId) => taskId === draggableId);

    // if dragging an item that is not selected - unselect all items
    if (!selected) {
      setSelectedTaskIds([]);
    }

    setDraggingTaskId(draggableId);
  };
    /**
   * On touch end from row
   */
    const onTouchEndRow = (e: TouchEvent<HTMLDivElement>, taskId: string) => {
      console.log('onTouchEndRow')
      if (e.defaultPrevented) {
        return;
      }
  
      // marking the event as used
      // we would also need to add some extra logic to prevent the click
      // if this element was an anchor
      e.preventDefault();
      toggleSelectionInGroup(taskId);
    };
  

  // Determines if the platform specific toggle selection in group key was used
  const wasToggleInSelectionGroupKeyUsed = (event: MouseEvent | KeyboardEvent) => {
    const isUsingWindows = navigator.userAgent.includes('Win')
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  const wasMultiSelectKeyUsed = (event: MouseEvent | KeyboardEvent) => event.shiftKey;


  /**
   * Toggle selection
   */
  const toggleSelection = (taskId: string) => {
    const wasSelected = selectedTaskIds.includes(taskId);

    const newTaskIds = (() => {
      // Task was not previously selected
      // now will be the only selected item
      if (!wasSelected) {
        return [taskId];
      }

      // Task was part of a selected group
      // will now become the only selected item
      if (selectedTaskIds.length > 1) {
        return [taskId];
      }

      // task was previously selected but not in a group
      // we will now clear the selection
      return [];
    })();

    console.log(newTaskIds)
    setSelectedTaskIds(newTaskIds);
  };

  /**
   * Toggle selection in group
   */
  const toggleSelectionInGroup = (taskId: string) => {
    const index = selectedTaskIds.indexOf(taskId);

    // if not selected - add it to the selected items
    if (index === -1) {
      setSelectedTaskIds([...selectedTaskIds, taskId]);

      return;
    }

    // it was previously selected and now needs to be removed from the group
    const shallow = [...selectedTaskIds];
    shallow.splice(index, 1);

    setSelectedTaskIds(shallow);
  };

  /**
   * Multi select to
   * This behaviour matches the MacOSX finder selection
   */
  const multiSelectTo = (newTaskId: string) => {
    const updated = multiSelect(tasks, selectedTaskIds, newTaskId);

    if (updated == null) {
      return;
    }

    setSelectedTaskIds(updated);
  };

  const performAction = (event: MouseEvent | KeyboardEvent, task: TaskType) => {

    if (wasToggleInSelectionGroupKeyUsed(event)) {
      toggleSelectionInGroup(task.id);
      return;
    }

    if (wasMultiSelectKeyUsed(event)) {
      multiSelectTo(task.id);
      return;
    }

    toggleSelection(task.id);
  };

  // Using onClick as it will be correctly
  // preventing if there was a drag
  const handleClickTask = (event: MouseEvent, task: TaskType) => {
    console.log('handleClickTask')
    if (event.defaultPrevented) {
      console.log('event.defaultPrevented')
      return;
    }

    if (event.button !== PRIMARY_BUTTON_NUMBER) {
      return;
    }

    event.preventDefault();
    performAction(event, task);
  };


  return (
    <DragDropContext 
    onBeforeCapture={onBeforeCapture}
    onDragEnd={onDragEnd}
    >
      <Droppable droppableId={todoId}>
        {(provided, snapshot) => (
          <div
            className='tasks'
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => {
              const { id, name, isCompleted } = task
              const isSelected = selectedTaskIds.some(i => i === id)
              return (
              <Draggable
                key={id}
                draggableId={`${id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    onClick={(e: MouseEvent) => handleClickTask(e, task)}
                    onTouchEnd={(e) => onTouchEndRow(e, id)}
                  >
                    <Task
                      key={id}
                      id={id}
                      name={name}
                      isCompleted={isCompleted}
                      onRemoveTask={onRemoveTask}
                      onCompleteChanged={onCompleteChanged}
                      isSelected={isSelected}
                    />
                  </div>
                )}
              </Draggable>
            )})}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Tasks
