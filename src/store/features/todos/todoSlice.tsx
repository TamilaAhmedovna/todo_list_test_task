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
        todosOrderUpdated: (state, action) => {
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
                if (todo.id !== action.payload.todoId) return todo

                return {
                    ...todo,
                    tasks: todo.tasks.filter(task => (task.id !== action.payload.taskId))
                }
            })
        },
        tasksOrderUpdated: (state, action) => {
            return state.map(todo => {
                if (todo.id !== action.payload.columnId) return todo

                return {
                    ...todo,
                    tasks: action.payload.tasks
                }
            })
        },
        taskCompleteUpdated: (state, action) => {
            return state.map(todo => {
                if (todo.id !== action.payload.todoId) return todo

                return {
                    ...todo,
                    tasks: todo.tasks.map(task => (task.id === action.payload.taskId)
                        ? { ...task, isCompleted: action.payload.isCompleted }
                        : task
                    )
                }
            })
        },
    }
})

// export actions for state updating
export const {
    todoCreated,
    todoDeleted,
    todosOrderUpdated,
    taskCreated,
    taskDeleted,
    tasksOrderUpdated,
    taskCompleteUpdated
} = todosSlice.actions

// export state items to use
export const selectTodos = (state: StateType) => state.todos

export default todosSlice.reducer
