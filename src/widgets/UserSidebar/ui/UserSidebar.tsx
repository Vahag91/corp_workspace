import styles from './UserSidebar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store/store'
import { setIsLogged } from 'redux/slices/userSlice' 


const UserSidebar: React.FC = () => {

    const { email, username, isLogged, userPhotoUrl} = useSelector((state: RootState) => {
        return state.user
    })

  const dispatch = useDispatch()


    return (
        <div className={styles.userSidebar}>
            {isLogged ? (
                <>
                    <div className={styles.userInfo}>
                        <span> {username}</span>
                        <span> {email}</span>

                        {userPhotoUrl ? (
                            <img src={userPhotoUrl} alt="userPhoto" />
                        ) : null
                        }
                    </div>

                    <div className={styles.userSettings}>
                        <ul>
                            <li> Managa Account</li>
                            <li> Cards </li>
                            <li>
                                <button type='button' onClick={() => dispatch(setIsLogged(false))}> Log Out</button>
                            </li>
                        </ul>
                    </div>

                </>
            ) : null}

        </div>
    )
}

export default UserSidebar