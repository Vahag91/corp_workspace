import React from "react";
import SignInGithub from "features/SignInGithub";
import SignInGoogle from "features/SignInGoogle";
import SignUpEmailAndPass from "features/SignUpEmailAndPass";
import styles from './RegistrationPage.module.css'


const RegistrationPage: React.FC = () => {

    return (

        <div className={styles.container}>

            <div className={styles.card}>

                <div>

                    <h2> Register</h2>
                    <div className={styles.form}>
                        <SignUpEmailAndPass />
                    </div>

                    <div className={styles.line}>
                        <span> OR</span>
                    </div>

                    <div className={styles.btnGroup}>
                        <SignInGithub />
                        <SignInGoogle />
                    </div>

                </div>
            </div>
        </div>

        /* <p>Forgot password? <Link to="#">Click Here!</Link></p> */
        // <SignInGithub/>
        // <SignInGoogle/>


    )
}

export default RegistrationPage