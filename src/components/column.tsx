import { useDispatch } from "react-redux"
import lodash from 'lodash'

import { TaskType } from "../models/models"
import EntityCreation from "./entityCreation"
import Tasks from "./rows"
import {
  taskCompleteUpdated,
  taskCreated,
  taskDeleted,
  tasksOrderUpdated,
  todoDeleted
} from "../store/features/todos/todoSlice"
import { useState } from "react"
import ColumnHeader from "./columnHeader"

type PropsType = {
  id: string
  name: string
  tasks: TaskType[]
}

function Column(props: PropsType) {
  const { id, name, tasks, ...rest } = props
  const dispatch = useDispatch()

  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>(tasks)

  const handleRemoveColumn = () => {
    dispatch(todoDeleted(id))
  }

  const addTask = (name: string) => {
    dispatch(taskCreated({
      columnId: id,
      task: {
        id: lodash.uniqueId('task-'),
        name,
        isCompleted: false
      }
    }))
  }

  const removeTask = (taskId: string) => {
    dispatch(taskDeleted({ todoId: id, taskId }))
  }

  const completeChanged = (taskId: string, isCompleted: boolean) => {
    dispatch(taskCompleteUpdated({ todoId: id, taskId, isCompleted }))
  }

  const updateTasksOrder = () => {
    dispatch(tasksOrderUpdated({ todoId: id, tasks: filteredTasks }))
  }

  return (
    <div className='column'>
      <ColumnHeader
        name={name}
        tasks={tasks}
        onRemoveColumn={handleRemoveColumn}
        onUpdateFilteredTasks={setFilteredTasks}
        {...rest}
      />
      <EntityCreation
        buttonName='Add Task'
        onAddItem={addTask}
      />
      <Tasks
        tasks={filteredTasks}
        onRemoveTask={removeTask}
        onCompleteChanged={completeChanged}
        onUpdateTasks={updateTasksOrder}
        columnId={id}
      />
    </div>
  )
}

export default Column
