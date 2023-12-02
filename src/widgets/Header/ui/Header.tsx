import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';
import { FaSistrix, FaList, FaClipboardUser, FaRegBell, FaRegCircleQuestion } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "entities/redux/store/store";
import UserSidebar from "widgets/UserSidebar";

const Header: React.FC = () => {

    const user = useSelector((state: RootState) => {
        return state.users
    })


    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false)


    const handleUserMenuOpen = (): void => {
        setUserMenuOpen(!userMenuOpen)
    }


    const userMenuRef = useRef<HTMLDivElement>(null);



    const handleClickOutside = (event: MouseEvent): void => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
            setUserMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <header>
            <nav className={styles.navBar}>

                <ul className={styles.navList}>
                    <li> <Link to="" className={styles.linkStyle}> <span><FaList /> </span></Link></li>
                    <li> <Link to="board" className={styles.linkStyle}> <span><FaClipboardUser /> TaskCraft</span></Link></li>
                    <li> <Link to="/user" className={styles.linkStyle}> <span>User</span></Link></li>
                    <li> <Link to="/article/:id" className={styles.linkStyle}> <span>Workspace</span></Link></li>
                </ul>


                <div className={styles.navList}>

                    <div className={styles.searchBox}>
                        <input type="text" placeholder="Search" />
                        <span className={styles.searchIcon}><FaSistrix /></span>
                    </div>

                    <div>
                        <ul className={styles.navIcons}>
                            <li> <Link to=""> <span><FaRegBell /></span></Link></li>
                            <li> <Link to=""> <span><FaRegCircleQuestion /></span></Link></li>

                            <li>
                                <div ref={userMenuRef}
                                    className={styles.userPhoto} onClick={handleUserMenuOpen}>
                                    {user && user.profile ? (
                                        user.profile.photoURL ? (
                                            <img src={user.profile.photoURL} alt="Userphoto" />
                                        ) : <img src="user" alt='user' />
                                    ) : null}

                                </div>
                            </li>
                        </ul>
                        {userMenuOpen ? (<UserSidebar />) : null}
                    </div>
                </div>

            </nav>

        </header>
    )
}


export default Header