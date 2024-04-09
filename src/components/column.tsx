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
  columnDeleted
} from '../store/columnsSlice'
import ColumnHeader from './columnHeader/columnHeader'

type PropsType = {
  id: string
  name: string
  tasks: TaskType[],
  draggingTaskId: string
}

function Column(props: PropsType) {
  const { id, name, tasks, draggingTaskId, ...dndProps } = props
  const dispatch = useDispatch()
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>(tasks)
  const [searchValue, setSearchValue] = useState<string>('')
  const isAllTasksSelected = filteredTasks.every(i => i.isSelected) 
    && !!filteredTasks.length

  const handleRemoveColumn = () => {
    dispatch(columnDeleted(id))
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
    dispatch(allTasksSelected({ columnId: id, isSelected, filteredTasks }))
  }

  return (
    <div className='column'>
      <ColumnHeader
        name={name}
        tasks={tasks}
        onRemoveColumn={handleRemoveColumn}
        onUpdateFilteredTasks={setFilteredTasks}
        isAllTasksSelected={isAllTasksSelected}
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
        draggingTaskId={draggingTaskId}
      />
    </div>
  )
}

export default Column
