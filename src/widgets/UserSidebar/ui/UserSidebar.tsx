import styles from './UserSidebar.module.css'
import { useSelector } from 'react-redux'
import { RootState } from 'entities/redux/store/store'



const UserSidebar: React.FC = () => {

  
    const users = useSelector((state: RootState) => {
        return state.users
    })





    return (
        <div className={styles.userSidebar}>
            {users.profile && users.profile.displayName  ? (
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
                            <li> Managa Account</li>
                            <li> Cards </li>
                            <li>
                                <button type='button'> Log Out</button>
                            </li>
                        </ul>
                    </div>

                </>
            ) : null}

        </div>
    )
}

export default UserSidebar