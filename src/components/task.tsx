import { TrashIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, MouseEvent } from 'react'
import { highlightSearch } from '../helpers/highlightSearch'

type PropsType = {
  id: string
  name: string
  isCompleted: boolean
  isSelected?: boolean
  onRemoveTask: (
    id: string,
    isSelected: boolean
  ) => void
  onCompleteChanged: (
    id: string,
    isCompleted: boolean,
    isSelected: boolean
  ) => void
  searchValue: string
  onToggleSelectTask: (
    taskId: string, 
    multiSelect: boolean
  ) => void
}

function Task(props: PropsType) {
  const {
    id,
    name,
    isCompleted,
    isSelected,
    onRemoveTask,
    onCompleteChanged,
    searchValue,
    onToggleSelectTask
  } = props

  const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCompleteChanged(id, e.target.checked, isSelected || false)
  }

  const handleClickTask = (e: MouseEvent<HTMLDivElement>) => {
    const multiSelect = e.ctrlKey || e.metaKey

    onToggleSelectTask(id, multiSelect)
  }

  return (
    <div
      className={`
        task 
        ${isCompleted ? 'completed' : ''}
        ${isSelected ? 'selected' : ''}
      `}
      onClick={handleClickTask}
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
          onClick={() => onRemoveTask(id, isSelected || false)}
        />
      </div>
    </div>
  )
}

export default Task
