import { TrashIcon } from "@heroicons/react/24/outline"
import ItemCreation from "./itemCreation"
import Tasks from "./tasks"
import { useState } from "react"
import { TaskType } from "../models/models"

type PropsType = {
  id: number
  name: string
  onRemoveTodo: (id: number) => void
}

function Todo(props: PropsType) {
  const { id, name, onRemoveTodo } = props
  const [tasks, setTasks] = useState<TaskType[]>([])

  const addTask = (name: string) => {
    setTasks((tasks: TaskType[]) => [...tasks, { id: tasks.length + 1, name, isCompleted: false }])
  }

  const removeTask = (id: number) => {
    setTasks((tasks: TaskType[]) => tasks.filter(i => i.id !== id))
  }

  const completeChanged = (id: number, isCompleted: boolean) => {
    setTasks((tasks: TaskType[]) => tasks.map(i => (i.id === id) ? {...i, isCompleted} : i))
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
      />
    </div>
  )
}

export default Todo
