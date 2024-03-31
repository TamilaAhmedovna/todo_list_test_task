import lodash from 'lodash'
import { useDispatch } from 'react-redux'

import Columns from './columns'
import EntityCreation from './entityCreation'
import { todoCreated } from '../store/features/todos/todoSlice'

function App() {
  const dispatch = useDispatch()

  const addTodo = (name: string) => {
    dispatch(todoCreated({
      id: lodash.uniqueId('todo-'),
      name,
      tasks: []
    }))
  }

  return (
    <div>
      <EntityCreation
        buttonName='Add Todo'
        onAddItem={addTodo}
      />
      <Columns />
    </div>
  )
}

export default App
