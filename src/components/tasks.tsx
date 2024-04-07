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
}

function Tasks(props: PropsType) {
  const {
    tasks,
    onRemoveTask,
    onCompleteChanged,
    columnId,
    searchValue,
    onToggleSelectTask
  } = props

  return (
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
            const { id, name, isCompleted, isSelected } = task
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
                      isSelected={isSelected}
                      onRemoveTask={onRemoveTask}
                      onCompleteChanged={onCompleteChanged}
                      searchValue={searchValue}
                      onToggleSelectTask={onToggleSelectTask}
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
  )
}

export default Tasks
