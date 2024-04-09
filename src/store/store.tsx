import { configureStore } from '@reduxjs/toolkit'
import columnsReducer from './todoSlice'

export const store = configureStore({
    reducer: {
        columns: columnsReducer
    }
})
