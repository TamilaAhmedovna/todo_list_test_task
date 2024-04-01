import { TrashIcon } from "@heroicons/react/24/outline"

import { TaskType } from "../models/models"
import { ChangeEvent, useEffect, useState } from "react"
import {
  TaskFilterTypes,
  filterAll,
  taskFilters
} from "../models/models"
import { filterTasks } from "../helpers/filterTasks"

type PropsType = {
  name: string
  tasks: TaskType[]
  onUpdateFilteredTasks: (filteredTasks: TaskType[]) => void
  onRemoveColumn: () => void
}

function ColumnHeader(props: PropsType) {
  const { 
    name, 
    tasks, 
    onRemoveColumn, 
    onUpdateFilteredTasks, 
    ...dndProps
  } = props
  const [filter, setFilter] = useState<TaskFilterTypes>(filterAll)

  useEffect(() => {
    onUpdateFilteredTasks(filterTasks(tasks, filter))
  }, [tasks, filter])

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value as TaskFilterTypes
    onUpdateFilteredTasks(filterTasks(tasks, filterValue))
    setFilter(filterValue)
  }

  return (
    <div className='column-header' {...dndProps}>
      <div className='column-name'>{name}</div>
      <div className='column-controls'>
        <select
          value={filter}
          onChange={handleFilterChange}
        >
          {taskFilters.map((value) => (
            <option
              key={value}
              value={value}
            >
              {value}
            </option>
          ))}
        </select>
        <TrashIcon
          className='icon'
          onClick={onRemoveColumn}
        />
      </div>
    </div>
  )
}

export default ColumnHeader