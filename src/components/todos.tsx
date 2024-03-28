import { TodoType } from '../models/models'
import Todo from './todo'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type PropsType = {
  todos: TodoType[]
  onRemoveTodo: (id: string) => void
  onUpdateTodos: (todos: TodoType[]) => void
}

function Todos(props: PropsType) {
  const { todos, onRemoveTodo, onUpdateTodos } = props

  // a little function to help us with reordering the result
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    onUpdateTodos(items)
  }

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightgrey' : 'lightblue',
    display: 'flex',
    padding: '10px',
    overflow: 'auto',
  });
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    marginRight: '10px',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className='todos'
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {todos.map(({ id, name }, index) => (
              <Draggable key={id} draggableId={`${id}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Todo
                      key={id}
                      id={id}
                      name={name}
                      onRemoveTodo={onRemoveTodo}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Todos
