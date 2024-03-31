import { ChangeEvent, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux';

import { TaskType } from '../models/models'
import Task from './row'
import { reorderSingleDrag } from "../services/dnd/dnd-utils";
import { selectTodos, tasksOrderUpdated } from '../store/features/todos/todoSlice';

type PropsType = {
  tasks: TaskType[]
  onRemoveTask: (id: string) => void
  onCompleteChanged: (id: string, isCompleted: boolean, e: ChangeEvent<HTMLInputElement>) => void
  onUpdateTasks: (tasks: TaskType[]) => void
  columnId: string
}

function Tasks(props: PropsType) {
  const { tasks, onRemoveTask, onCompleteChanged, columnId: todoId } = props
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()

  const onDragEnd = (result: { destination: any; source: any; reason: any }) => {
    const { source, destination, reason } = result;

    // dropped outside the list, nothing to do
    if (!destination || reason === "CANCEL") {
      return;
    }

    const processed = reorderSingleDrag({
      entities: todos,
      selectedTaskIds,
      source,
      destination
    });
    console.log("onDragEnd", processed)

    dispatch(tasksOrderUpdated({ todoId: processed?.columnId, tasks: processed?.entities }))
  }

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

    setSelectedTaskIds(newTaskIds);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type="ROW"
        droppableId={todoId}
        isDropDisabled={false}
      >
        {(provided, snapshot) => (
          <div
            className='tasks'
            ref={provided.innerRef}
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
                      onClick={() => toggleSelection(id)}
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
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Tasks
