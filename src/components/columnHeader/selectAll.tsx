import { CheckIcon } from '@heroicons/react/24/outline'

type PropsType = {
  isAllTasksSelected: boolean
  disabled: boolean
  onSelectAllTasks: (isSelected: boolean) => void
}

function SelectAll(props: PropsType) {
  const {
    isAllTasksSelected,
    disabled,
    onSelectAllTasks
  } = props

  return (
    <div
      className={`select-all ${disabled ? 'disabled' : ''}`}
      onClick={() => onSelectAllTasks(!isAllTasksSelected)}
    >
      <CheckIcon
        className={`
          icon 
          ${!isAllTasksSelected || disabled ? 'hidden' : ''}
        `}
      />
    </div>
  )
}

export default SelectAll
