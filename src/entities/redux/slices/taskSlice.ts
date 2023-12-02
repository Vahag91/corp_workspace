import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "entities/firebase/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "@firebase/firestore";

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
    return { columnId, id: docRef.id, ...postData };
  }
);

export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async ({ boardId, columnId }: any) => {
    const tasksCollection = collection(db, "boards", boardId, "columns", columnId, "tasks");
    const querySnapshot = await getDocs(tasksCollection);

    const tasks = querySnapshot.docs.map((doc) => ({
      columnId,
      id: doc.id,
      ...doc.data(),
    }));

    return tasks;
  }
);


export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ postData, boardId, columnId, taskId }: any) => {
    const taskDocRef = doc(db, "boards", boardId, "columns", columnId, "tasks", taskId);
    await updateDoc(taskDocRef, postData);
    return { columnId, id: taskId, ...postData };
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ boardId, columnId, taskId }: any) => {
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
      const uniqueTasks = action.payload.filter((newTask: any) => {
        return !state.some(existingTask => existingTask.id === newTask.id);
      });
      return [...state, ...uniqueTasks];
    },

    [updateTask.fulfilled as any]: (state, action) => {
      const index = state.findIndex(
        (post: any) => post.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export default taskSlice.reducer;














