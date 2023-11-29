import boardReducer from '../slices/boardSlice'
import todoReducer from '../slices/todoCardSlice'
import { configureStore } from "@reduxjs/toolkit"
import userInfoSlice from '../slices/userInfoSlice';
import taskSlice from '../slices/taskSlice';
import columnSlice from '../slices/columnSlice';
import boardsSlice from '../slices/boardsSlice';

export const store = configureStore({
    reducer: {
        boards: boardsSlice,
        column: columnSlice,
        tasks: taskSlice,
        board: boardReducer,
        todo: todoReducer,
        users: userInfoSlice
    },
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch