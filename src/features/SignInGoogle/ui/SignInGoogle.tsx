import { loginWithGoogle } from 'entities/redux/thunk/loginWithGoogle';
import { FaGoogle } from "react-icons/fa6";
import styles from './SignInGoogle.module.css'
import { useAppDispatch } from 'entities/hooks/useAppDispatch';


const SignInGoogle: React.FC = () => {


    const dispatch = useAppDispatch()

  

    const handleGoogleLogin = async () => {
        await dispatch(loginWithGoogle())

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