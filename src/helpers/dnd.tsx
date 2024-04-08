import { DropResult } from 'react-beautiful-dnd'
import { ColumnType, TaskType } from '../models/models'

const reorderSingleDrag = (
    list: (ColumnType | TaskType)[],
    result: DropResult
) => {
    const { source, destination } = result

    if (!destination) return

    const startIndex = source.index
    const endIndex = destination.index

    const data = Array.from(list);
    const [removed] = data.splice(startIndex, 1)
    data.splice(endIndex, 0, removed)

    return data
}

const reorderMultiRows = (
    list: ColumnType[],
    result: DropResult
) => {
    const { source, destination } = result

    if (!destination) return

    const data = Array.from(list)
    const sourceColumn = data.find(column => column.id === source.droppableId)
    const destinationColumn = data.find(column => column.id === destination.droppableId)

    if (!sourceColumn || !destinationColumn) return

    const sourceTasks = [...sourceColumn.tasks]
    const destinationTasks = [...destinationColumn.tasks]
    const endIndex = destination.index
    const draggableTasks = sourceTasks.filter(task => task.isSelected)

    // if source and destination are the same
    if (sourceColumn.id === destinationColumn.id) {
        const markedTasks = sourceTasks.map((
            t: TaskType & { toBeRemoved?: boolean }
        ) => 
            t.isSelected
                ? {...t, toBeRemoved: true}
                : t
        )
        markedTasks.splice(endIndex, 0, ...draggableTasks)
        const reorderedTasks = markedTasks.filter(t => !t.toBeRemoved)
        return data.map(column => ({
            ...column,
            tasks: (column.id === sourceColumn.id)
                ? reorderedTasks
                : column.tasks
        }))
    }

    const sourceColumnTasksUpdated = sourceTasks.filter(task => !task.isSelected)

    if (!draggableTasks?.length) return

    destinationTasks.splice(endIndex, 0, ...draggableTasks)

    return data.map(column => ({
        ...column,
        tasks: (column.id !== source.droppableId && column.id !== destination.droppableId)
            ? column.tasks
            : (column.id === source.droppableId)
                ? sourceColumnTasksUpdated
                : destinationTasks
    }))
}

const reorderSingleRow = (
    list: ColumnType[],
    result: DropResult
) => {
    const { source, destination } = result

    if (!destination) return

    const data = Array.from(list)
    const sourceColumn = data.find(column => column.id === source.droppableId)
    const destinationColumn = data.find(column => column.id === destination.droppableId)

    if (!sourceColumn || !destinationColumn) return

    // if source and destination are the same
    if (sourceColumn.id === destinationColumn.id) {
        return data.map(column => ({
            ...column,
            tasks: (column.id === sourceColumn.id)
                ? reorderSingleDrag(sourceColumn.tasks, result)
                : column.tasks
        }))
    }

    const startIndex = source.index
    const endIndex = destination.index

    const sourceColumnTasks = [...sourceColumn.tasks]
    const destinationColumnTasks = [...destinationColumn.tasks]

    const [draggableTask] = sourceColumnTasks.splice(startIndex, 1)
    destinationColumnTasks.splice(endIndex, 0, draggableTask)

    return data.map(column => ({
        ...column,
        tasks: (column.id !== source.droppableId && column.id !== destination.droppableId)
            ? column.tasks
            : (column.id === source.droppableId)
                ? sourceColumnTasks
                : destinationColumnTasks
    }))
}

export const dnd = (
    list: ColumnType[],
    result: DropResult
) => {
    if (result.type === 'COLUMN') {
        return reorderSingleDrag(list, result)
    }

    const column = list.find(item => item.id === result.source.droppableId)
    const draggableItem = column?.tasks.find(item => item.id === result.draggableId)

    return draggableItem?.isSelected
        ? reorderMultiRows(list, result)
        : reorderSingleRow(list, result)
};
