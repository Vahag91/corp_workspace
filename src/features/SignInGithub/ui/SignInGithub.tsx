import styles from './SignInGithub.module.css'
import { FaGithub } from "react-icons/fa6";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { loginWithGithub } from "entities/redux/thunk/loginWithGithub";
import { useNavigate } from 'react-router-dom';


const SignInGithub: React.FC = () => {


    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signInGithub = async () => {
        await dispatch(loginWithGithub())
        navigate('/board');
    }

    return (
        <button type='button' className={styles.githubBtn} onClick={signInGithub}>
            <FaGithub />
        </button>
    )
}


export default SignInGithub