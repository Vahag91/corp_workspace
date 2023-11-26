import styles from './SignIn.module.css'
import { FaPaperPlane, FaLock } from "react-icons/fa6";




const SignIn: React.FC = () => {

   


    return (
      <div>
               <div className={styles.formField}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
              />
                <span> <FaPaperPlane /> </span>
            </div>

            <div className={styles.formField}>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    />
                <span> <FaLock /> </span>
            </div>

            <div className={styles.btnDiv}>
                <button
                    className={styles.btnGroup}
                   >
                    Sign In
                </button>
            </div>
      </div>
    )

}

export default SignIn