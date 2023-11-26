

import { auth } from '../../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FaGoogle  } from "react-icons/fa6";
import styles from './SignInGoogle.module.css'
import { useDispatch } from 'react-redux';
import { setIsLogged } from 'redux/slices/userSlice';



const SignInGoogle: React.FC = () => {


    const dispatch = useDispatch()

    const signInGoogle = async () => {
        const provider = new GoogleAuthProvider()

        try {
            await signInWithPopup(auth, provider)
            dispatch(setIsLogged(true))
        } catch (err) {
            console.log(err,);

        }
    }


    return (
        <button type='button' className={styles.googleBtn} onClick={signInGoogle}>
            <FaGoogle  />
        </button>
    )
}


export default SignInGoogle