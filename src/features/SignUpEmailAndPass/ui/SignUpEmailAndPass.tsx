import { FaPaperPlane, FaLock } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setUsername, setEmail, setPassword, setIsLogged } from 'redux/slices/userSlice';
import { validateEmail, validatePassword } from 'utils/validate';
import styles from './SignUpEmailAndPass.module.css'



const SignUpEmailAndPass: React.FC = () => {

    let userEmail = ""
    let userPassword = ""
    let userName = ""


    const dispatch = useDispatch()

    const handleSignIn = (): void => {

        if (!validateEmail(userEmail)) {
            return
        }

        if (!validatePassword(userPassword)) {
            return
        }

        dispatch(setEmail(userEmail))
        dispatch(setPassword(userPassword))
        dispatch(setUsername(userName))
        dispatch(setIsLogged(true))
    }


    return (

        <div>
            <div className={styles.formField}>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => userName = e.target.value} />
                <span> <FaPaperPlane /> </span>
            </div>

            <div className={styles.formField}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => userEmail = e.target.value} />
                <span> <FaPaperPlane /> </span>
            </div>

            <div className={styles.formField}>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => userPassword = e.target.value}
                />
                <span> <FaLock /> </span>
            </div>

            <div className={styles.btnDiv}>
                <button
                    className={styles.btnGroup}
                    onClick={handleSignIn} >
                    Sign Up
                </button>
            </div>

        </div>


    )
}

export default SignUpEmailAndPass


// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

// const signUp = async () => {

//     try {
//         await createUserWithEmailAndPassword(auth, email, password)
//     } catch (err) {
//         console.log(err,);
//     }
// }