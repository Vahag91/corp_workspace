import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';
import { FaSistrix, FaList, FaClipboardUser, FaRegBell, FaRegCircleQuestion } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import UserSidebar from "widgets/UserSidebar";


const Header: React.FC = () => {


    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false)

    const usersPhoto = useSelector((state:RootState)=>{
        return state.user.userPhotoUrl
    })

    const handleUserMenuOpeb = (): void => {
        setUserMenuOpen(!userMenuOpen)
    }



    return (
        <header>
            <nav className={styles.navBar}>

                <ul className={styles.navList}>
                    <li> <Link to="" className={styles.linkStyle}> <span><FaList /> </span></Link></li>
                    <li> <Link to="board" className={styles.linkStyle}> <span><FaClipboardUser /> Trello</span></Link></li>
                    <li> <Link to="/user" className={styles.linkStyle}> <span>User</span></Link></li>
                    <li> <Link to="/workspace" className={styles.linkStyle}> <span>Workspace</span></Link></li>
                        </ul>


                <div className={styles.navList}>

                    <div className={styles.searchBox}>
                        <input type="text" placeholder="Search" />
                        <span className={styles.searchIcon}><FaSistrix /></span>
                    </div>
                    
                    <div>
                        <ul className={styles.navIcons}>
                            <li> <Link to="#"> <span><FaRegBell /></span></Link></li>
                            <li> <Link to="#"> <span><FaRegCircleQuestion /></span></Link></li>

                            <li>
                                <div className={styles.userPhoto} onClick={handleUserMenuOpeb}>
                                    {usersPhoto ? (
                                        <img src={usersPhoto} alt="Userphoto" />
                                    ) : null}

                                </div>
                            </li>
                        </ul>
                        {userMenuOpen ? (
                          <UserSidebar/>
                        ) : (null)}

                    </div>
                </div>

            </nav>

        </header>
    )
}


export default Header