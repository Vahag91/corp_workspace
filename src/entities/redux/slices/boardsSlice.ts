import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "entities/firebase/firebaseConfig";
import { Column } from "./columnSlice";

export interface Board {
    id: string
    columns: Column[]
}

const initialState: Board[] = []


export const createBoard = createAsyncThunk(

    "boards/createBoard",
    async (postData: any) => {


        const boardRef = await addDoc(collection(db, 'boards'), {});
        const boardId = boardRef.id;

        const columnRef = await addDoc(collection(db, 'boards', boardId, 'columns'), {});
        const columnId = columnRef.id;

        await addDoc(collection(db, 'boards', boardId, 'columns', columnId, 'tasks'), postData);
        return { id: boardRef.id, columns: [{ id: columnRef.id, tasks: [] }], ...postData };
    }
);





export const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
    extraReducers: {
        [createBoard.fulfilled as any]: (state, action) => {
            state.push(action.payload);
        }
    }
    })

export default boardsSlice.reducer