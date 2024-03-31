import { useDispatch, useSelector } from 'react-redux'
import lodash from 'lodash'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Column from './column'
import { selectTodos, todosOrderUpdated } from '../store/features/todos/todoSlice'
import { ColumnType } from '../models/models'
import { reorder } from '../services/dnd/dnd-utils'

function Columns() {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)

  const onDragEnd = (result: any) => {
    console.log(result)
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    dispatch(todosOrderUpdated(items))
  }

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    marginRight: '10px',

    ...draggableStyle,
  });

  const renderColumn = (column: ColumnType, index: number) => (
    <Draggable
      key={column.id}
      draggableId={`${column.id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Column {...column} {...provided.dragHandleProps} />
        </div>
      )}
    </Draggable>
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type="COLUMN"
        droppableId={lodash.uniqueId()}
        direction="horizontal"
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
