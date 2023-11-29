import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Boards {
    name: string,
    color: string
}

export interface BoardsState {
    boardList: Boards[]
}

const initialState: BoardsState = {
    boardList: [
     { name: "Board", color: "#40A35B" }
    ]
}

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<Boards>) => {
            return { 
                ...state,
                 boardList: [...state.boardList, action.payload]};
        }
    }
})

export const { setBoard } = boardSlice.actions;
export default boardSlice.reducer