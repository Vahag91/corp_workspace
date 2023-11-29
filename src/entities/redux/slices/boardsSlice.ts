import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDoc,getDocs } from "@firebase/firestore";
import { db } from "entities/firebase/firebaseConfig";
import { Column } from "./columnSlice";

export interface Board {
    id: string
    columns: Column[]
}

const initialState: Board[] = [

]


export const createBoard = createAsyncThunk(

    "boards/createBoard",
    async (postData: any) => {

        const boardRef = await addDoc(collection(db, 'boards'), {});
        const boardId = boardRef.id;

        const columnRef = await addDoc(collection(db, 'boards', boardId, 'columns'), {});
        const columnId = columnRef.id;

        const taskRef = await addDoc(collection(db, 'boards', boardId, 'columns', columnId, 'tasks'), postData);
        return { id: boardRef.id, columns: [{ id: columnRef.id, tasks: [{ id: taskRef.id, ...postData }] }], };
    }
);



export const fetchBoard = createAsyncThunk(
    "boards/fetchBoard",
    async (boardId: any) => {
      const boardDocRef = doc(db, 'boards', boardId);
      const boardSnapshot = await getDoc(boardDocRef);
  
      if (boardSnapshot.exists()) {
        const boardData = boardSnapshot.data();
  
        const columnsCollectionRef = collection(db, 'boards', boardId, 'columns');
        const columnsSnapshot = await getDocs(columnsCollectionRef);
  
        const columns = columnsSnapshot.docs.map((columnDoc) => {
          const columnId = columnDoc.id;
          const columnData = columnDoc.data();
  
          return { id: columnId, ...columnData };
        });
  
        return { id: boardId, columns, ...boardData };
      }
   }
  );
  



export const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
    extraReducers: {
        [createBoard.fulfilled as any]: (state, action) => {
            state.push(action.payload);
        },
        [fetchBoard.fulfilled as any]: (state, action) => {
            state.push(action.payload);
        },
    }
})

export default boardsSlice.reducer