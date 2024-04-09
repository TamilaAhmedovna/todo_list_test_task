import { Draggable, Droppable } from 'react-beautiful-dnd'

import { TaskType } from '../models/models'
import Task from './task'

type PropsType = {
  tasks: TaskType[]
  onRemoveTask: (
    id: string,
    isSelected: boolean
  ) => void
  onCompleteChanged: (
    id: string, 
    isCompleted: boolean, 
    isSelected: boolean
  ) => void
  columnId: string
  searchValue: string
  onToggleSelectTask: (
    taskId: string, 
    multiSelect: boolean
  ) => void
  draggingTaskId: string
}

function Tasks(props: PropsType) {
  const {
    tasks,
    onRemoveTask,
    onCompleteChanged,
    columnId,
    searchValue,
    onToggleSelectTask,
    draggingTaskId
  } = props

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className='tasks'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => {
            const { id, name, isCompleted, isSelected } = task
            const isGhosting = isSelected && 
              Boolean(draggingTaskId) && 
              draggingTaskId !== id

            return (
              <Draggable
                key={id}
                draggableId={`${id}`}
                index={index}
              >
                {(provided) => {
                  return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${isGhosting ? 'task-ghosting' : ''}`}
                  >
                    <Task
                      key={id}
                      id={id}
                      name={name}
                      isCompleted={isCompleted}
                      isSelected={isSelected}
                      onRemoveTask={onRemoveTask}
                      onCompleteChanged={onCompleteChanged}
                      searchValue={searchValue}
                      onToggleSelectTask={onToggleSelectTask}
                    />
                  </div>
                )}}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Tasks
