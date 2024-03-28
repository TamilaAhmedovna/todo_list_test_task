import { ChangeEvent, useState } from "react"
import lodash from 'lodash'
import { TrashIcon } from "@heroicons/react/24/outline"

import { TaskType } from "../models/models"
import ItemCreation from "./itemCreation"
import Tasks from "./tasks"

type PropsType = {
  id: string
  name: string
  onRemoveTodo: (id: string) => void
}

function Todo(props: PropsType) {
  const { id, name, onRemoveTodo } = props
  const [tasks, setTasks] = useState<TaskType[]>([])

  const addTask = (name: string) => {
    setTasks((tasks: TaskType[]) => [
      ...tasks, 
      { 
        id: lodash.uniqueId('task'), 
        name, 
        isCompleted: false 
      }
    ])
  }

  const removeTask = (id: string) => {
    setTasks((tasks: TaskType[]) => tasks.filter(i => i.id !== id))
  }

  const completeChanged = (id: string, isCompleted: boolean, e: ChangeEvent<HTMLInputElement>) => {
    setTasks((tasks: TaskType[]) => 
      tasks.map(i => (i.id === id) ? {...i, isCompleted} : i))
  }

  return (
    <div className='todo'>
      <div className='todo-controls'>
        {name}
        <TrashIcon className='icon' onClick={() => onRemoveTodo(id)} />
      </div>
      <ItemCreation buttonName='Add Task' onAddItem={addTask} />
      <Tasks 
        tasks={tasks} 
        onRemoveTask={removeTask}
        onCompleteChanged={completeChanged}
        onUpdateTasks={setTasks}
        todoId={id}
      />
    </div>
  )
}

export default Todo
