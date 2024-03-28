import { useState } from 'react'
import lodash from 'lodash'

import { TodoType } from '../models/models'
import Todos from './todos'
import ItemCreation from './itemCreation'

function App() {
  const [todos, setTodos] = useState<TodoType[]>([])

  const addTodo = (name: string) => {
    setTodos((todos: TodoType[]) => [
      ...todos, 
      { 
        id: lodash.uniqueId('todo-'), 
        name 
      }
    ])
  }

  const removeTodo = (id: string) => {
    setTodos((todos: TodoType[]) => todos.filter(i => i.id !== id))
  }

  return (
    <div>
      <ItemCreation
        buttonName='Add Todo'
        onAddItem={addTodo}
      />
      <Todos
        todos={todos}
        onRemoveTodo={removeTodo}
        onUpdateTodos={setTodos}
      />
      <i>Multi select: Ctrl/Shift + Left Click</i>
    </div>
  )
}

export default App
