import { createSlice } from '@reduxjs/toolkit'
import { ColumnType } from '../../../models/models'

type StateType = {
    todos: ColumnType[]
}

const initialState: ColumnType[] = []

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoCreated: (state, action) => {
            state.push(action.payload)
        },
        todoDeleted: (state, action) => {
            return state.filter(todo => (todo.id !== action.payload))
        },
        todosOrderUpdated: (_state, action) => {
            return action.payload
        },
        taskCreated: (state, action) => {
            state.map(todo => {
                if (todo.id === action.payload.columnId) {
                    todo.tasks.push(action.payload.task)
                } else {
                    return todo
                }
            })
        },
        taskDeleted: (state, action) => {
            return state.map(todo => {
                if (todo.id !== action.payload.columnId) return todo

                return {
                    ...todo,
                    tasks: todo.tasks.filter(task => 
                        action.payload.isSelected
                            ? !task.isSelected 
                            : task.id !== action.payload.taskId
                    )
                }
            })
        },
        taskCompleteUpdated: (state, action) => {
            return state.map(todo => {
                if (todo.id !== action.payload.columnId) return todo

                return {
                    ...todo,
                    tasks: todo.tasks.map(task =>
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
            return state.map(todo => {
                if (todo.id !== action.payload.columnId) return todo

                return {
                    ...todo,
                    tasks: todo.tasks.map(task => {
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
            return state.map(todo => {
                if (todo.id !== action.payload.columnId) return todo

                return {
                    ...todo,
                    tasks: todo.tasks.map(task => ({
                        ...task,
                        isSelected: action.payload.isSelected
                    }))
                }
            })
        }
    }
})

// export actions for state updating
export const {
    todoCreated,
    todoDeleted,
    todosOrderUpdated,
    taskCreated,
    taskDeleted,
    taskSelectionUpdated,
    allTasksSelected,
    taskCompleteUpdated
} = todosSlice.actions

// export state items to use
export const selectTodos = (state: StateType) => state.todos

export default todosSlice.reducer
