import { TodoType } from '../models/models'
import Todo from './todo'

type PropsType = {
  todos: TodoType[]
  onRemoveTodo: (id: number) => void
}

function Todos(props: PropsType) {
  const { todos, onRemoveTodo } = props

  return (
    <div className='todos'>
      {todos.map(({ id, name }) => (
        <Todo
          key={id}
          id={id}
          name={name}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </div>
  )
}

export default Todos
