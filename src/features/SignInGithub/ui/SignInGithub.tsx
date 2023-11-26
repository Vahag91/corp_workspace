import { useDispatch } from "react-redux";
import { setIsLogged } from "redux/slices/userSlice";
import { auth } from "../../../firebase";
import styles from './SignInGithub.module.css'
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGithub } from "react-icons/fa6";


const SignInGithub: React.FC = () => {

    const dispatch = useDispatch()
    const signInGithub = async () => {
        const provider = new GithubAuthProvider()

        try {
            await signInWithPopup(auth, provider)
            dispatch(setIsLogged(true))
        } catch (err) {
            console.log(err);

        }
    }

return (
    <button type='button' className={styles.githubBtn} onClick={signInGithub}>
    <FaGithub />
</button>
)
}


export default SignInGithub