import { createAsyncThunk } from "@reduxjs/toolkit"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from 'entities/firebase/firebaseConfig'
import { User } from "../slices/userInfoSlice"



const loginWithGoogle = createAsyncThunk(
    'users/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {

            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
          
            const userData: User = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
             
               
            }

            return userData
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            } else {
                rejectWithValue("My error message")
            }
        }

    }
)

export { loginWithGoogle }