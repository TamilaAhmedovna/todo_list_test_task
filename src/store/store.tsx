import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todoSlice'

export default configureStore({
    reducer: {
        todos: todosReducer
    }
})
