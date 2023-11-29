import styles from './SignInGithub.module.css'
import { FaGithub } from "react-icons/fa6";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { loginWithGithub } from "entities/redux/thunk/loginWithGithub";


const SignInGithub: React.FC = () => {


    const dispatch = useAppDispatch()


    const signInGithub = async () => {
       await dispatch(loginWithGithub())
   }

    return (
        <button type='button' className={styles.githubBtn} onClick={signInGithub}>
            <FaGithub />
        </button>
    )
}


export default SignInGithub