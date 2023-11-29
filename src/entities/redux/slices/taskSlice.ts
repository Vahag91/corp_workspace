
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "entities/firebase/firebaseConfig";
import { collection, addDoc, doc } from "@firebase/firestore";

export interface Task {
    id: string;
    author: string;
    description: string;
    title: string;
}

const initialState: Task[] = [];

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (postData: any) => {
       
        const board = collection(db, "boards",);
        const column = doc(board, 'column')
        const tasks = collection(column,'tasks')
         console.log(tasks);

        const docRef = await addDoc(tasks, postData);

        return { id: docRef.id, ...postData };
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: {
        [createTask.fulfilled as any]: (state, action) => {
            const { id, author, description, title } = action.payload;
            state.push({ id, author, description, title });
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
  