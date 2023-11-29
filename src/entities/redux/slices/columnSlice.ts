import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "entities/firebase/firebaseConfig";
import { collection, addDoc,} from "@firebase/firestore";
import { Task } from "./taskSlice";

export interface Column {
  id: string;
  tasks: Task[];
}

const initialState: Column[] = [];

export const createColumn = createAsyncThunk(

  "columns/createColumn",
  async (postData: any) => {

    const boardId = collection(db, "boards")
    const columnRef = await addDoc(boardId, {})
    const columnCollections = collection(db, 'boards', columnRef.id, "tasks")
    await addDoc(columnCollections, postData)

    return { id: columnRef.id, ...postData };
  }
);



const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: {
    [createColumn.fulfilled as any]: (state, action) => {
      state.push({ id: action.payload.id, tasks: [] });
    },
  },
});

export default columnSlice.reducer;
