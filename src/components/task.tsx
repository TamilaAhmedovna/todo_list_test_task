import { TrashIcon } from "@heroicons/react/24/outline"
import ItemCreation from "./itemCreation"
import Tasks from "./tasks"
import { useState } from "react"
import { TaskType } from "../models/models"

type PropsType = {
  id: number
  name: string
  isCompleted: boolean
  onRemoveTask: (id: number) => void
  onCompleteChanged: (id: number, isCompleted: boolean) => void
}

function Todo(props: PropsType) {
  const { id, name, isCompleted, onRemoveTask, onCompleteChanged } = props

  return (
    <div className={`task ${isCompleted ? 'completed' : ''}`}>
      {name}
      <div className='task-controls'>
        <label>
          <input
            checked={isCompleted}
            type='checkbox'
            onChange={(e) => onCompleteChanged(id, e.target.checked)}
          />
          Done
        </label>
        <TrashIcon className='icon' onClick={() => onRemoveTask(id)} />
      </div>
    </div>
  )
}

export default Todo
