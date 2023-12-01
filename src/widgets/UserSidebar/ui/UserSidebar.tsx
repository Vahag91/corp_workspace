import styles from './UserSidebar.module.css'
import { useSelector } from 'react-redux'
import { RootState } from 'entities/redux/store/store'
import { signOut } from 'firebase/auth'
import { auth } from 'entities/firebase/firebaseConfig'
import { useDispatch } from 'react-redux'
import { deleteUser } from 'entities/redux/slices/userInfoSlice'
import { Link } from 'react-router-dom'


const UserSidebar: React.FC = () => {


    const users = useSelector((state: RootState) => {
        return state.users
    })

    const dispatch = useDispatch()
    const handleSignOut = () => {
        signOut(auth).catch(err => console.log(err));
        localStorage.removeItem("accessToken")
        dispatch(deleteUser())

    };



    return (
        <div className={styles.userSidebar}>
    
            {users.profile && users.profile.displayName ? (
                <>
                    <div className={styles.userInfo}>
                        <span> {users.profile.displayName}</span>
                        <span> {users.profile.email}</span>

                        {users.profile.photoURL ? (
                            <img src={users.profile.photoURL} alt="userPhoto" />
                        ) : null
                        }
                    </div>

                    <div className={styles.userSettings}>
                        <ul>
                            <li> <Link to="/user"> Managa Account</Link> </li>
                            <li> <Link to="/board"> Boards</Link> </li>
                            <li>
                                <button type='button' onClick={handleSignOut}> Log Out</button>
                            </li>
                        </ul>
                    </div>

                </>
            ) : null}

        </div>
    )
}

export default UserSidebar