import { TrashIcon } from "@heroicons/react/24/outline"
import { ChangeEvent } from "react"

type PropsType = {
  id: string
  name: string
  isCompleted: boolean
  onRemoveTask: (id: string) => void
  onCompleteChanged: (id: string, isCompleted: boolean, e: ChangeEvent<HTMLInputElement>) => void
  isSelected: boolean
}

function Task(props: PropsType) {
  const { id, name, isCompleted, onRemoveTask, onCompleteChanged, isSelected } = props

  console.log(name, isCompleted)
  return (
    <div 
      className={`
        task 
        ${isCompleted ? 'completed' : ''}
        ${isSelected ? 'selected' : ''}
      `}
    >
      <div className='task-name'>{name}</div>
      <div className='task-controls'>
        <label>
          <input
            checked={isCompleted}
            type='checkbox'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onCompleteChanged(id, e.target.checked, e)
            }}
            onClick={(e) => e.stopPropagation()}
          />
          Done
        </label>
        <TrashIcon className='icon' onClick={() => onRemoveTask(id)} />
      </div>
    </div>
  )
}

export default Task
