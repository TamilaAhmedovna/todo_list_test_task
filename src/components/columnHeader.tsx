import { useEffect, useState } from 'react'

import { TaskType } from '../models/models'
import {
  TaskFilterTypes,
  filterAll,
} from '../models/models'
import { filterTasks } from '../helpers/filterTasks'
import Filter from './filter'
import ColumnProps from './columnProps'
import SelectAll from './selectAll'

type PropsType = {
  name: string
  tasks: TaskType[]
  onUpdateFilteredTasks: (filteredTasks: TaskType[]) => void
  onRemoveColumn: () => void
  isAllTasksSelected: boolean
  onSelectAllTasks: (isSelected: boolean) => void
}

function ColumnHeader(props: PropsType) {
  const {
    name,
    tasks,
    onRemoveColumn,
    onUpdateFilteredTasks,
    isAllTasksSelected,
    onSelectAllTasks,
    ...dndProps
  } = props
  const [filter, setFilter] = useState<TaskFilterTypes>(filterAll)

  useEffect(() => {
        onUpdateFilteredTasks(filterTasks(tasks, filter))
  }, [tasks])

  const handleFilterChange = (value: TaskFilterTypes) => {
    // When applying filter all tasks become unselected
    const removedSelection = tasks.map(task => ({ ...task, isSelected: false }))
    
    onUpdateFilteredTasks(filterTasks(removedSelection, value))
    setFilter(value)
  }
  return (
    <div>
      <ColumnProps
        name={name}
        onRemoveColumn={onRemoveColumn}
        {...dndProps}
      />
      <hr className='column-divider' />
      <div className='column-task-controls'>
        <Filter
          onHandleFilterChange={handleFilterChange}
          filter={filter}
          disabled={!tasks.length}
        />
        <SelectAll
          isAllTasksSelected={isAllTasksSelected}
          onSelectAllTasks={onSelectAllTasks}
          disabled={!tasks.length}
        />
      </div>
    </div>
  )
}

export default ColumnHeader
