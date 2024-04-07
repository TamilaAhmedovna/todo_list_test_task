import { useDispatch, useSelector } from 'react-redux'
import { 
  DragDropContext, 
  Draggable, 
  DropResult, 
  Droppable
} from 'react-beautiful-dnd'

import Column from './column'
import { selectTodos, todosOrderUpdated } from '../store/features/todos/todoSlice'
import { ColumnType } from '../models/models'
import { reorder } from '../helpers/dnd'

function Columns() {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = reorder(todos, result);

    dispatch(todosOrderUpdated(items))
  }

  const renderColumn = (column: ColumnType, index: number) => (
    <Draggable
      key={column.id}
      draggableId={`${column.id}`}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            userSelect: 'none',
            marginRight: '10px',
        
            ...provided.draggableProps.style,
          }}
        >
          <Column 
            {...column} 
            {...provided.dragHandleProps}
          />
        </div>
      )}
    </Draggable>
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId='board'
        type='COLUMN'
        direction='horizontal'
      >
        {(provided) => (
          <div
            className='columns'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((column, index) => renderColumn(column, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Columns
