import { loginWithGoogle } from 'redux/thunk/loginWithGoogle';
import { RootState } from 'redux/store/store';
import { FaGoogle } from "react-icons/fa6";
import styles from './SignInGoogle.module.css'
import { useDispatch } from 'react-redux';
import { setIsLogged } from 'redux/slices/userSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';



const SignInGoogle: React.FC = () => {


    const dispatch = useAppDispatch()
    const myDispatch = useDispatch()
    const user = useSelector((state: RootState) => {
        return state.user
    })

    const handleGoogleLogin = async () => {
        await dispatch(loginWithGoogle())
        myDispatch(setIsLogged(true))
        console.log(user);

    }



    // const signInGoogle = async () => {
    //     const provider = new GoogleAuthProvider()

    //     try {
    //         await signInWithPopup(auth, provider)
    //         dispatch(setIsLogged(true))
    //     } catch (err) {
    //         console.log(err,);

    //     }
    // }


    return (
        <button type='button' className={styles.googleBtn} onClick={handleGoogleLogin}>
            <FaGoogle />
        </button>
    )
}


export default SignInGoogle