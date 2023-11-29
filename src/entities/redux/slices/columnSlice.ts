import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "entities/firebase/firebaseConfig";
import { collection, addDoc,doc,deleteDoc,updateDoc,getDocs } from "@firebase/firestore";
import { Task } from "./taskSlice";


export interface Column {
  id: string;
  tasks: Task[];
}

const initialState: Column[] = [];



export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async (boardId: string) => {
    const columnsCollectionRef = collection(db, 'boards', boardId, 'columns');
    const columnsSnapshot = await getDocs(columnsCollectionRef);

    const columns = columnsSnapshot.docs.map((columnDoc: any) => {
      const columnId = columnDoc.id;
      const columnData = columnDoc.data();

      return { id: columnId, ...columnData };
    });

    return columns;
  }
);

export const createColumn = createAsyncThunk(
  "column/createColumn",
  async ({ postData, boardId }: any) => {

    const columnRef = await addDoc(collection(db, 'boards', boardId, 'columns'), {});
    const columnId = columnRef.id;
    const tasksCollectionRef = collection(db, 'boards', boardId, 'columns', columnId, 'tasks');
    const taskRef = await addDoc(tasksCollectionRef, postData);

    return { id: columnRef.id, tasks: [{ id: taskRef.id, ...postData }] };
  }
);

export const updateColumn = createAsyncThunk(
  "column/updateColumn",
  async ({postdata, columnId, boardId}:  any) => {
    const columnDocRef = doc(db, 'boards', boardId, 'columns', columnId);
    await updateDoc(columnDocRef, postdata);
    return { id: columnId, ...postdata };
  }
);

export const deleteColumn = createAsyncThunk(
  "column/deleteColumn",
  async ({ columnId, boardId }:any) => {
    const columnDocRef = doc(db, 'boards', boardId, 'columns', columnId);
    await deleteDoc(columnDocRef);
    return columnId;
  }
);


const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {},
  extraReducers: {
    [createColumn.fulfilled as any]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default columnSlice.reducer;
