import { TrashIcon } from "@heroicons/react/24/outline"

import { TaskType } from "../models/models"
import { ChangeEvent, useEffect, useState } from "react"
import { 
  TaskFilterTypes, 
  filterAll, 
  filterCompleted, 
  filterNotCompleted, 
  taskFilters
} from "../models/models"

type PropsType = {
  name: string
  tasks: TaskType[]
  onUpdateFilteredTasks: (filteredTasks: TaskType[]) => void
  onRemoveColumn: () => void
}

function ColumnHeader(props: PropsType) {
  const { name, tasks, onRemoveColumn, onUpdateFilteredTasks, ...rest } = props
  const [filter, setFilter] = useState<TaskFilterTypes>(filterAll)

  useEffect(() => {
    onUpdateFilteredTasks(getFilteredTasks(filter))
  }, [tasks, filter])

  const getFilteredTasks = (filter: TaskFilterTypes) => (
    tasks.filter(task => {
        switch (filter) {
          case filterAll:
            return task
          case filterCompleted:
            return task.isCompleted
          case filterNotCompleted:
            return !task.isCompleted
        }
      })
  )

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value as TaskFilterTypes
    onUpdateFilteredTasks(getFilteredTasks(filterValue))
    setFilter(filterValue)
  }

  return (
    <div className='column-header' {...rest}>
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
