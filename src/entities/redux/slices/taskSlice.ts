
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "entities/firebase/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc,deleteDoc,doc } from "@firebase/firestore";

export interface Task {
    id: string;
    author: string;
    description: string;
    title: string;
}

const initialState: Task[] = [
 { id: "1",
  author: "",
  description: "",
  title: "",
}
];

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ postData, boardId, columnId }: any) => {
    const tasks = collection(db, "boards", boardId, "columns", columnId, "tasks");
    const docRef = await addDoc(tasks, postData);
    return { id: docRef.id, columnId, ...postData };
  }
);
export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async ({ boardId, columnId }: any) => {
    const tasksCollection = collection(db, "boards", boardId, "columns", columnId, "tasks");
    const querySnapshot = await getDocs(tasksCollection);

    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      columnId,
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
          const existsPost = state.find(
            (post: any) => post.id === action.payload.id
          );
    
          if (!existsPost) {
            state.push(action.payload);
          }
      },
    },
});

export default taskSlice.reducer;















// import {
//     collection,
//     getDocs,
//     getDoc,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     doc,
//   } from "@firebase/firestore";
  
//   import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//   import { db } from "../firebase/firebaseConfig";
//   import { storage } from "../firebase/firebaseConfig";
  
//   export const fetchPosts = createAsyncThunk("blog/fetchPosts", async () => {
//     const querySnapshot = await getDocs(collection(db, "posts"));
  
//     return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
//   });
  
//   export const fetchPost = createAsyncThunk(
//     "blog/fetchPost",
//     async (id: string) => {
//       const postRef = doc(db, "posts", id);
//       const postSnapshot = await getDoc(postRef);
//       if (postSnapshot.exists()) {
//         return { id: postSnapshot.id, ...postSnapshot.data() };
//       } else {
//         throw new Error("Post not found");
//       }
//     }
//   );
  
//   export const createPost = createAsyncThunk(
//     "blog/createPost",
//     async (postData: any) => {
//       const docRef = await addDoc(collection(db, "posts"), postData);
//       return { id: docRef.id, ...postData };
//     }
//   );
  
//   export const updatePost = createAsyncThunk(
//     "blog/updatePost",
//     async ({ id, postData }: { id: string; postData: any }) => {
//       const postRef = doc(db, "posts", id);
//       await updateDoc(postRef, postData);
//       return { id, ...postData };
//     }
//   );
  
//   export const deletePost = createAsyncThunk(
//     "blog/deletePost",
//     async (id: string) => {
//       const postRef = doc(db, "posts", id);
//       await deleteDoc(postRef);
//       return id;
//     }
//   );
  
//   const blogSlice = createSlice({
//     name: "blog",
//     initialState: {
//       posts: [] as any,
//       loading: false,
//       error: null,
//     },
//     reducers: {},
//     extraReducers: {
//       [fetchPosts.pending as any]: (state) => {
//         state.loading = true;
//       },
//       [fetchPosts.fulfilled as any]: (state, action) => {
//         state.loading = false;
//         state.posts = action.payload;
//       },
//       [fetchPosts.rejected as any]: (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       },
  
//       [fetchPost.pending as any]: (state) => {
//         state.loading = true;
//       },
//       [fetchPost.fulfilled as any]: (state, action) => {
//         state.loading = false;
//         const existsPost = state.posts.find(
//           (post: any) => post.id === action.payload.id
//         );
  
//         if (!existsPost) {
//           state.posts.push(action.payload);
//         }
//       },
//       [fetchPost.rejected as any]: (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       },
  
//       [createPost.pending as any]: (state) => {
//         state.loading = true;
//       },
//       [createPost.fulfilled as any]: (state, action) => {
//         state.loading = false;
//         state.posts.push(action.payload as any);
//       },
//       [createPost.rejected as any]: (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       },
  
//       [updatePost.pending as any]: (state) => {
//         state.loading = true;
//       },
//       [updatePost.fulfilled as any]: (state, action) => {
//         state.loading = false;
//         const index = state.posts.findIndex(
//           (post: any) => post.id === action.payload.id
//         );
  
//         if (index !== -1) {
//           state.posts[index] = action.payload;
//         }
//       },
//       [updatePost.rejected as any]: (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       },
  
//       [deletePost.pending as any]: (state) => {
//         state.loading = true;
//       },
//       [deletePost.fulfilled as any]: (state, action) => {
//         state.loading = false;
//         state.posts = state.posts.filter(
//           (post: any) => post.id !== action.payload
//         );
//       },
//       [deletePost.rejected as any]: (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       },
//     },
//   });
  
//   export default blogSlice.reducer;
  