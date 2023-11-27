import boardReducer from '../slices/boardSlice'
import userReducer from '../slices/userSlice';
import todoReducer from '../slices/todoCardSlice'
import { configureStore } from "@reduxjs/toolkit"




export const store = configureStore({
    reducer: {
        user: userReducer,
        boards: boardReducer,
        todo: todoReducer
    },
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch