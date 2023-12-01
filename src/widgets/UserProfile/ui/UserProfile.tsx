import React, { useEffect } from "react"
import styles from './UserProfile.module.css'
import { useSelector } from "react-redux"
import { RootState } from "entities/redux/store/store"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "entities/firebase/firebaseConfig"

const UserProfile: React.FC = () => {

    const users = useSelector((state: RootState) => {
        return state.users
    })



  

    const navigate = useNavigate()

    useEffect(() => {
        if (!users.profile || !users.profile.photoURL) {
            navigate('/login');
        }
    }, [users, navigate])


    return (
        <div className={styles.user}>
            <div className={styles.userDetails}>
                {users.profile && users.profile.displayName ? (
                    <>
                        <div className={styles.userProfile}>
                            {users.profile.photoURL ? (
                                <img src={users.profile.photoURL} alt="user" />
                            ) : null
                            }

                        </div>

                        <div className={styles.userInfo}>
                            <h2> {users.profile.displayName}</h2>
                            <p> {users.profile.email}</p>
                        </div>
                    </>
                ) : null
                }

            </div>

            <form >
                <div className={styles.form}>
                    <div>
                        <label htmlFor="name"> Name</label>
                        <input type="text" placeholder="Name" id="name" />
                    </div>

                    <div>
                        <label htmlFor="email">Email </label>
                        <input type="email" placeholder="email" id="email" />
                    </div>

                    <div>
                        <label htmlFor="about"> About Me </label>
                        <input type="text" id="about" />
                    </div>

                    <div>
                        <label htmlFor="password"> Change password </label>
                        <input type="password" />
                        <input type="password" />
                    </div>
                </div>
                <div className={styles.btnGroup}>
                    <button>Submit</button>
                </div>
            </form>



        </div>

    )
}


export default UserProfile