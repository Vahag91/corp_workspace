import { FaPaperPlane, FaLock } from "react-icons/fa6";
import { validateEmail, validatePassword } from 'utils/validate';
import styles from './SignUpEmailAndPass.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "entities/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "entities/redux/slices/userInfoSlice";
import { useNavigate } from "react-router-dom";



const SignUpEmailAndPass: React.FC = () => {

    let displayName = ""
    let email = ""
    let userName = ""

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSignIn = async () => {

        if (!validateEmail(email)) {
            return
        }
        if (!validatePassword(displayName)) {
            return
        }
        try{
            await createUserWithEmailAndPassword(auth, email, displayName)
        } catch(err){
            console.log(err,"Could not Sign Up");
        }
     
        dispatch(setUser({ displayName, email }))
        navigate('/board')
    }


    return (

        <div>
            <div className={styles.formField}>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => displayName = e.target.value} />
                <span> <FaPaperPlane /> </span>
            </div>

            <div className={styles.formField}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => email = e.target.value} />
                <span> <FaPaperPlane /> </span>
            </div>

            <div className={styles.formField}>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => userName = e.target.value}
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