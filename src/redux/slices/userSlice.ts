import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface UserState {
    username: string | null,
    email: string | null,
    password: string | null,
    userPhotoUrl: string | null
    isLogged: boolean

}

const initialState: UserState = {
    username: "",
    email: "",
    password: "",
    userPhotoUrl: "",
    isLogged: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction<string | null>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string | null>) => {
            state.password = action.payload;
        },
        setUserPhotoUrl: (state, action: PayloadAction<string|null>) => {
            state.userPhotoUrl = action.payload
        },
        setIsLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload
        }

    }
})

export const { setUsername, setEmail, setPassword,setUserPhotoUrl, setIsLogged } = userSlice.actions;
export default userSlice.reducer;