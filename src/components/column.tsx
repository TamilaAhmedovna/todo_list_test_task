import { useState } from 'react'
import { useDispatch } from 'react-redux'
import lodash from 'lodash'

import { TaskType } from '../models/models'
import EntityCreation from './entityCreation'
import Tasks from './tasks'
import {
  allTasksSelected,
  taskCompleteUpdated,
  taskCreated,
  taskDeleted,
  taskSelectionUpdated,
  todoDeleted
} from '../store/features/todos/todoSlice'
import ColumnHeader from './columnHeader'

type PropsType = {
  id: string
  name: string
  tasks: TaskType[]
}

function Column(props: PropsType) {
  const { id, name, tasks, ...dndProps } = props
  const dispatch = useDispatch()
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>(tasks)
  const [searchValue, setSearchValue] = useState<string>('')

  const handleRemoveColumn = () => {
    dispatch(todoDeleted(id))
  }

  const addTask = (name: string) => {
    setSearchValue('')
    dispatch(taskCreated({
      columnId: id,
      task: {
        id: lodash.uniqueId('task-'),
        name,
        isCompleted: false,
        isSelected: false
      }
    }))
  }

  const removeTask = (taskId: string, isSelected: boolean) => {
    dispatch(taskDeleted({ columnId: id, taskId, isSelected }))
  }

  const completeChanged = (taskId: string, isCompleted: boolean, isSelected: boolean) => {
    dispatch(taskCompleteUpdated({ columnId: id, taskId, isCompleted, isSelected }))
  }

  const toggleSelectTask = (taskId: string, multiSelect: boolean) => {
    dispatch(taskSelectionUpdated({ columnId: id, taskId, multiSelect }))
  }

  const toggleSelectAllTasks = (isSelected: boolean) => {
    dispatch(allTasksSelected({ columnId: id, isSelected }))
  }

  return (
    <div className='column'>
      <ColumnHeader
        name={name}
        tasks={tasks}
        onRemoveColumn={handleRemoveColumn}
        onUpdateFilteredTasks={setFilteredTasks}
        isAllTasksSelected={filteredTasks.every(i => i.isSelected)}
        onSelectAllTasks={toggleSelectAllTasks}
        {...dndProps}
      />
      <EntityCreation
        buttonName='Add Task'
        onAddItem={addTask}
        onSetName={setSearchValue}
      />
      <Tasks
        tasks={filteredTasks}
        onRemoveTask={removeTask}
        onCompleteChanged={completeChanged}
        columnId={id}
        searchValue={searchValue}
        onToggleSelectTask={toggleSelectTask}
      />
    </div>
  )
}

export default Column
