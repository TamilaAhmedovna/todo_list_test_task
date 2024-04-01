import { TrashIcon } from "@heroicons/react/24/outline"
import { ChangeEvent } from "react"
import { highlightSearch } from "../helpers/highlightSearch"

type PropsType = {
  id: string
  name: string
  isCompleted: boolean
  onRemoveTask: (id: string) => void
  onCompleteChanged: (
    id: string,
    isCompleted: boolean,
    e: ChangeEvent<HTMLInputElement>
  ) => void
  searchValue: string
}

function Task(props: PropsType) {
  const {
    id,
    name,
    isCompleted,
    onRemoveTask,
    onCompleteChanged,
    searchValue
  } = props

  const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCompleteChanged(id, e.target.checked, e)
  }

  return (
    <div
      className={`
        task 
        ${isCompleted ? 'completed' : ''}
      `}
    >
      <div className='task-name'>
        {highlightSearch(name, searchValue)}
      </div>
      <div className='task-controls'>
        <label>
          <input
            checked={isCompleted}
            type='checkbox'
            onChange={handleCompleteChange}
            onClick={(e) => e.stopPropagation()}
          />
          Done
        </label>
        <TrashIcon
          className='icon'
          onClick={() => onRemoveTask(id)}
        />
      </div>
    </div>
  )
}

export default Task
