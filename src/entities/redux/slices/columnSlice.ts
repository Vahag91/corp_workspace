import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "entities/firebase/firebaseConfig";
import { collection, addDoc, doc, deleteDoc, updateDoc, getDocs } from "@firebase/firestore";
import { Task } from "./taskSlice";


export interface Column {
  id: string;
  title: string;
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
  async ({ boardId, title }: any) => {
    const columnRef = await addDoc(collection(db, 'boards', boardId, 'columns'), { title });
  
    
   
    return { id: columnRef.id, title, tasks: [] };
  }
);

export const updateColumn = createAsyncThunk(
  "column/updateColumn",
  async ({ postdata, columnId, boardId }: any) => {
    const columnDocRef = doc(db, 'boards', boardId, 'columns', columnId);
    await updateDoc(columnDocRef, postdata);
    return { id: columnId, ...postdata };
  }
);

export const deleteColumn = createAsyncThunk(
  "column/deleteColumn",
  async ({ columnId, boardId }: any) => {
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
    [fetchColumns.fulfilled as any]: (state, action) => {
      return action.payload
    },
    [updateColumn.fulfilled as any]: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const columnIndex = state.findIndex((column) => column.id === id);
      if (columnIndex !== -1) {
        state[columnIndex] = { id, ...updatedData };
      }
    },
  },
});

export default columnSlice.reducer;
