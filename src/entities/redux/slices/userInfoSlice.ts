
import { loginWithGithub } from 'entities/redux/thunk/loginWithGithub';
import { getDocs, addDoc, deleteDoc, updateDoc, collection, doc } from '@firebase/firestore'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db } from 'entities/firebase/firebaseConfig'
import { loginWithGoogle } from "entities/redux/thunk/loginWithGoogle";


export interface User {
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
}


export interface UserState {
    isLogged: boolean,
    error: string | null,
    profile: User | null,
}

const initialState: UserState = {
    isLogged: false,
    error: null,
    profile: null,
}








export const createUser = createAsyncThunk(
    'users/createUser',
    async (data: any) => {
        await addDoc(collection(db, 'users'), data)
    }
);


export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId: any) => {
        await deleteDoc(doc(db, 'users', userId));
        return userId;
    }
);


export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userid, data }: any) => {

        await updateDoc(doc(db, 'users', userid), data);
        return { userid, ...data };
    }
);




const userInfoSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},


    extraReducers: {
        // [fetchUser.fulfilled as any]: (state, action) => {
        //     state.users = action.payload
        // },

        // [deletePost.fulfilled as any]: (state, action) => {
        //     state.users = state.users.filter((user: any) => user.id !== action.payload);
        // },

        // [createPost.fulfilled as any]: (state, action) => {
        //     state.users = action.payload
        // },


        // [updatePost.fulfilled as any]: (state, action) => {
        //     const { userId, ...data } = action.payload;
        //     state.users = state.users.map((user: any) =>
        //         user.id === userId ? { userId, ...data } : user
        //     );
        // },  


        [loginWithGoogle.pending as any]: (state) => {
            state.isLogged = true;
        },
        [loginWithGoogle.fulfilled as any]: (state, action: PayloadAction<User>) => {
            state.profile = action.payload

        },
        [loginWithGoogle.rejected as any]: (state, action) => {
            state.isLogged = false;
            state.error = action.error.message;
        },

        [loginWithGithub.pending as any]: (state) => {
            state.isLogged = true;
        },
        [loginWithGithub.fulfilled as any]: (state, action: PayloadAction<User>) => {
            state.profile = action.payload
        },
        [loginWithGithub.rejected as any]: (state, action) => {
            state.isLogged = false;
            state.error = action.error.message;
        },
    }
})



export default userInfoSlice.reducer



// export const fetchUser = createAsyncThunk(
//     'users/fetchPosts',
//     async () => {
//         const querySnapshot = await getDocs(collection(db, 'users'))
//         return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
//     }
// );

// export const createUser = createAsyncThunk(
//     'users/createUser',
//     async (data: any) => {
//         const docRef = await addDoc(collection(db, 'users'), data)
//         return { id: docRef.id, ...data }
//     }
// );

