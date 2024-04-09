import { createSlice } from '@reduxjs/toolkit'
import { ColumnType, TaskType } from '../models/models'

type StateType = {
    columns: ColumnType[]
}

const initialState: ColumnType[] = []

export const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        columnCreated: (state, action) => {
            state.push(action.payload)
        },
        columnDeleted: (state, action) => {
            return state.filter(column => (column.id !== action.payload))
        },
        columnsOrderUpdated: (_state, action) => {
            return action.payload
        },
        taskCreated: (state, action) => {
            state.map(column => {
                if (column.id === action.payload.columnId) {
                    column.tasks.push(action.payload.task)
                } else {
                    return column
                }
            })
        },
        taskDeleted: (state, action) => {
            return state.map(column => {
                if (column.id !== action.payload.columnId) return column

                return {
                    ...column,
                    tasks: column.tasks.filter(task => 
                        action.payload.isSelected
                            ? !task.isSelected 
                            : task.id !== action.payload.taskId
                    )
                }
            })
        },
        taskCompleteUpdated: (state, action) => {
            return state.map(column => {
                if (column.id !== action.payload.columnId) return column

                return {
                    ...column,
                    tasks: column.tasks.map(task =>
                        action.payload.isSelected
                            ? task.isSelected
                                ? { ...task, isCompleted: action.payload.isCompleted }
                                : task
                            : (task.id === action.payload.taskId)
                                ? { ...task, isCompleted: action.payload.isCompleted }
                                : task
                    )
                }
            })
        },
        taskSelectionUpdated: (state, action) => {
            return state.map(column => {
                if (column.id !== action.payload.columnId) return column

                return {
                    ...column,
                    tasks: column.tasks.map(task => {
                        return {
                            ...task,
                            isSelected: (task.id === action.payload.taskId)
                                ? !task.isSelected
                                : action.payload.multiSelect ? task.isSelected : false
                        }
                    })
                }
            })
        },
        allTasksSelected: (state, action) => {
            return state.map(column => {
                if (column.id !== action.payload.columnId) return column

                return {
                    ...column,
                    tasks: column.tasks.map(task => ({
                        ...task,
                        isSelected: action.payload.isSelected && action.payload.filteredTasks.some((t: TaskType) => t.id === task.id)
                    }))
                }
            })
        }
    }
})

// export actions for state updating
export const {
    columnCreated,
    columnDeleted,
    columnsOrderUpdated,
    taskCreated,
    taskDeleted,
    taskSelectionUpdated,
    allTasksSelected,
    taskCompleteUpdated
} = columnsSlice.actions

// export state items to use
export const selectColumns = (state: StateType) => state.columns

export default columnsSlice.reducer
