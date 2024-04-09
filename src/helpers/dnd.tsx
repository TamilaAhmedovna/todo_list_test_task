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

    const data = Array.from(list)
    const [removed] = data.splice(startIndex, 1)
    data.splice(endIndex, 0, removed)

    return data
}

const reorderSingleRow = (
    list: ColumnType[],
    result: DropResult
) => {
    const { source, destination } = result

    if (!destination) return

    const sourceColumn = list.find(column => column.id === source.droppableId)
    const destinationColumn = list.find(column => column.id === destination.droppableId)

    if (!sourceColumn || !destinationColumn) return

    // check if source and destination are the same columns
    return sourceColumn.id === destinationColumn.id
        ? reorderSingleRowInSameColumn(list, sourceColumn.id, sourceColumn.tasks, result)
        : reorderSingleRowToAnotherColumn(list, [...sourceColumn.tasks], [...destinationColumn.tasks], result)
}

const reorderSingleRowInSameColumn = (
    list: ColumnType[], 
    columnId: string,
    tasks: TaskType[],
    result: DropResult
) => {
    return list.map(column => ({
        ...column,
        tasks: (column.id === columnId)
            ? reorderSingleDrag(tasks, result)
            : column.tasks
    }))
}

const reorderSingleRowToAnotherColumn = (
    list: ColumnType[],
    sourceColumnTasks: TaskType[],
    destinationColumnTasks: TaskType[],
    result: DropResult
) => {
    const { source, destination } = result
    
    if (!destination) return
    
    const startIndex = source.index
    const endIndex = destination.index

    const [draggableTask] = sourceColumnTasks.splice(startIndex, 1)
    destinationColumnTasks.splice(endIndex, 0, draggableTask)

    return list.map(column => ({
        ...column,
        tasks: (column.id !== source.droppableId && column.id !== destination.droppableId)
            ? column.tasks
            : (column.id === source.droppableId)
                ? sourceColumnTasks
                : destinationColumnTasks
    }))
}

const reorderMultiRows = (
    list: ColumnType[],
    result: DropResult
) => {
    const { source, destination } = result

    if (!destination) return

    const sourceColumn = list.find(column => column.id === source.droppableId)
    const destinationColumn = list.find(column => column.id === destination.droppableId)

    if (!sourceColumn || !destinationColumn) return

    const draggableTasks = [...sourceColumn.tasks].filter(task => task.isSelected)

    // check if source and destination are the same columns
    return sourceColumn.id === destinationColumn.id
        ? reorderMultiRowsInSameColumn(list, sourceColumn, draggableTasks, result)
        : reorderMultiRowsToAnotherColumn(list, sourceColumn, destinationColumn, draggableTasks, result)
}

const reorderMultiRowsInSameColumn = (
    list: ColumnType[],
    sourceColumn: ColumnType,
    draggableTasks: TaskType[],
    result: DropResult
) => {
    const { source, destination } = result
    
    if (!destination) return
    
    const markedTasks = sourceColumn.tasks.map((
        t: TaskType & { toBeRemoved?: boolean }
    ) => 
        t.isSelected
            ? {...t, toBeRemoved: true}
            : t
    )

    const endIndex = destination.index > source.index
        ? destination.index + draggableTasks.length
        : destination.index
    markedTasks.splice(endIndex, 0, ...draggableTasks)
    const reorderedTasks = markedTasks.filter(t => !t.toBeRemoved)
    return list.map(column => ({
        ...column,
        tasks: (column.id === sourceColumn.id)
            ? reorderedTasks
            : column.tasks
    }))
}

const reorderMultiRowsToAnotherColumn = (
    list: ColumnType[],
    sourceColumn: ColumnType,
    destinationColumn: ColumnType,
    draggableTasks: TaskType[],
    result: DropResult
) => {
    const { source, destination } = result
    
    if (!destination) return

    const endIndex = destination.index
    const destinationTasks = [...destinationColumn.tasks]
    const sourceColumnTasksUpdated = sourceColumn.tasks.filter(task => !task.isSelected)

    if (!draggableTasks?.length) return

    destinationTasks.splice(endIndex, 0, ...draggableTasks)

    return list.map(column => ({
        ...column,
        tasks: (column.id !== source.droppableId && column.id !== destination.droppableId)
            ? column.tasks
            : (column.id === source.droppableId)
                ? sourceColumnTasksUpdated
                : destinationTasks
    }))
}

export const dnd = (
    list: ColumnType[],
    result: DropResult
) => {
    // dragging column
    if (result.type === 'COLUMN') {
        return reorderSingleDrag(list, result)
    }

    const column = list.find(item => item.id === result.source.droppableId)
    const draggableItem = column?.tasks.find(item => item.id === result.draggableId)

    // dragging task (multi drag is possible)
    return draggableItem?.isSelected
        ? reorderMultiRows(list, result)
        : reorderSingleRow(list, result)
}
