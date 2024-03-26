import { useState } from 'react'
import { TodoType } from '../models/models'
import Todos from './todos'
import ItemCreation from './itemCreation'

function App() {
  const [todos, setTodos] = useState<TodoType[]>([])

  const addTodo = (name: string) => {
    setTodos((todos: TodoType[]) => [...todos, { id: todos.length + 1, name }])
  }

  const removeTodo = (id: number) => {
    setTodos((todos: TodoType[]) => todos.filter(i => i.id !== id))
  }

  return (
    <div>
      <ItemCreation buttonName='Add Todo' onAddItem={addTodo}/>
      <Todos todos={todos} onRemoveTodo={removeTodo} />
    </div>
  )
}

export default App
