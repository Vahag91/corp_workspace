import { createAsyncThunk } from "@reduxjs/toolkit"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import  {auth} from '../../firebase/firebaseConfig'
import { UserState } from "redux/slices/userSlice"

 const loginWithGoogle = createAsyncThunk(
    'user/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {

            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            console.log(result);
            
            const userData: UserState = {
                displayName: result.user.displayName,
                email: result.user.email,
                userPhotoUrl: result.user.photoURL
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

export {loginWithGoogle}