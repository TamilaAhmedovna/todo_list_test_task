import lodash from 'lodash'
import { useDispatch } from 'react-redux'

import Columns from './columns'
import EntityCreation from './entityCreation'
import { columnCreated } from '../store/todoSlice'

function App() {
  const dispatch = useDispatch()

  const addColumn = (name: string) => {
    dispatch(columnCreated({
      id: lodash.uniqueId('column-'),
      name,
      tasks: []
    }))
  }

  return (
    <div>
      <EntityCreation
        buttonName='Add Todo'
        onAddItem={addColumn}
      />
      <Columns />
    </div>
  )
}

export default App
