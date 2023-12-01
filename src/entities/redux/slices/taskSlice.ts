
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "entities/firebase/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc,deleteDoc,doc } from "@firebase/firestore";

export interface Task {
  columnId: string;
    id: string;
    author: string;
    description: string;
    title: string;
}

const initialState: Task[] = [];




export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ postData, boardId, columnId }: any) => {
    const tasks = collection(db, "boards", boardId, "columns", columnId, "tasks");
    const docRef = await addDoc(tasks, postData);
    return {columnId, id: docRef.id, ...postData };
  }
);

export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async ({ boardId, columnId }: any) => {
    const tasksCollection = collection(db, "boards", boardId, "columns", columnId, "tasks");
    const querySnapshot = await getDocs(tasksCollection);

    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return tasks;
  }
);


export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({postData, boardId, columnId, taskId }:any) => {
      const taskDocRef = doc(db, "boards", boardId, "columns", columnId, "tasks", taskId);
      await updateDoc(taskDocRef, postData);
      return { id: taskId, ...postData };
    }
  );
  
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async ({ boardId, columnId,taskId }:any) => {
      const taskDocRef = doc(db, "boards", boardId, "columns", columnId, "tasks", taskId);
      await deleteDoc(taskDocRef);
      return taskId;
    }
  );

  

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: {
        [createTask.fulfilled as any]: (state, action) => {
            state.push(action.payload)
        },
        [fetchTask.fulfilled as any]: (state, action) => {
          return [...state, ...action.payload];
      },
    },
});

export default taskSlice.reducer;














