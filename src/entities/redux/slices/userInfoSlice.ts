
import { loginWithGithub } from 'entities/redux/thunk/loginWithGithub';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginWithGoogle } from "entities/redux/thunk/loginWithGoogle";


export interface User {
    displayName: string | null,
    email: string | null,
    photoURL?: string | null,

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




const userInfoSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.profile = action.payload
        },
        setUserWithLogin: (state, action) => {
           const {email,displayName} = action.payload
           if (state.profile) {
            state.profile = {
                ...state.profile,
                email,
                displayName,
            };
        }
        },
        deleteUser: (state) => {
            state.profile = null
        }
    },


    extraReducers: {

        [loginWithGoogle.pending as any]: (state) => {
            state.isLogged = true;
        },
        [loginWithGoogle.fulfilled as any]: (state, action: PayloadAction<User>) => {
            state.profile = action.payload
            state.isLogged = false;
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
            state.isLogged = false;
        },
        [loginWithGithub.rejected as any]: (state, action) => {
            state.isLogged = false;
            state.error = action.error.message;
        },
    }
})


export const { setUser,deleteUser } = userInfoSlice.actions;
export default userInfoSlice.reducer

