import { ChangeEvent } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux';

import { TaskType } from '../models/models'
import Task from './task'
import { reorder } from "../helpers/dnd";
import { tasksOrderUpdated } from '../store/features/todos/todoSlice';

type PropsType = {
  tasks: TaskType[]
  onRemoveTask: (id: string) => void
  onCompleteChanged: (id: string, isCompleted: boolean, e: ChangeEvent<HTMLInputElement>) => void
  onUpdateTasks: (tasks: TaskType[]) => void
  columnId: string
  searchValue: string
}

function Tasks(props: PropsType) {
  const {
    tasks,
    onRemoveTask,
    onCompleteChanged,
    columnId,
    searchValue
  } = props
  const dispatch = useDispatch()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return

    const items = reorder(
      tasks,
      source.index,
      destination.index
    );

    dispatch(tasksOrderUpdated({ columnId, tasks: items }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={columnId}
        isDropDisabled={false}
      >
        {(provided) => (
          <div
            className='tasks'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => {
              const { id, name, isCompleted } = task
              return (
                <Draggable
                  key={id}
                  draggableId={`${id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        key={id}
                        id={id}
                        name={name}
                        isCompleted={isCompleted}
                        onRemoveTask={onRemoveTask}
                        onCompleteChanged={onCompleteChanged}
                        searchValue={searchValue}
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
