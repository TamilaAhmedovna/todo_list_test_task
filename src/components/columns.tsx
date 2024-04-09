import { useDispatch, useSelector } from 'react-redux'
import { 
  DragDropContext, 
  Draggable, 
  DropResult, 
  Droppable,
  OnBeforeCaptureResponder
} from 'react-beautiful-dnd'

import Column from './column'
import { selectColumns, columnsOrderUpdated } from '../store/todoSlice'
import { ColumnType } from '../models/models'
import { dnd } from '../helpers/dnd'
import { useState } from 'react'

function Columns() {
  const dispatch = useDispatch()
  const columns = useSelector(selectColumns)
  const [draggingTaskId, setDraggingTaskId] = useState('');

  const onBeforeCapture: OnBeforeCaptureResponder = (start) => {
    const draggableId = start.draggableId;

    setDraggingTaskId(draggableId);
  };
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = dnd(columns, result);

    dispatch(columnsOrderUpdated(items))
    setDraggingTaskId('')
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
            draggingTaskId={draggingTaskId}
            {...column} 
            {...provided.dragHandleProps}
          />
        </div>
      )}
    </Draggable>
  )

  return (
    <DragDropContext 
      onDragEnd={onDragEnd}
      onBeforeCapture={onBeforeCapture}
    >
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
            {columns.map((column, index) => renderColumn(column, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {!!columns.length && <i>Multi select: Ctrl/Command + Left Click</i>}
    </DragDropContext>
  )
}

export default Columns
