import { loginWithGoogle } from 'entities/redux/thunk/loginWithGoogle';
import { FaGoogle } from "react-icons/fa6";
import styles from './SignInGoogle.module.css'
import { useAppDispatch } from 'entities/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';


const SignInGoogle: React.FC = () => {


    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const handleGoogleLogin = async () => {
        await dispatch(loginWithGoogle())
        navigate('/board')
    }


    return (
        <button type='button' className={styles.googleBtn} onClick={handleGoogleLogin}>
            <FaGoogle />
        </button>
    )
}


export default SignInGoogle