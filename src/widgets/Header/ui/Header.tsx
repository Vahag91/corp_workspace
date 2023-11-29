import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css';
import { FaSistrix, FaList, FaClipboardUser, FaRegBell, FaRegCircleQuestion } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "entities/redux/store/store";
import UserSidebar from "widgets/UserSidebar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { createTask, } from "entities/redux/slices/taskSlice";
import { createColumn } from "entities/redux/slices/columnSlice";
import { createBoard } from "entities/redux/slices/boardsSlice";

const Header: React.FC = () => {

    const user = useSelector((state: RootState) => {
        return state.users
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (!user.profile || !user.profile.displayName) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, [user, navigate])



    const obj = {
        author: "vahag",
        description: "ffff",
        title: "mmmm"
    }

    const boards = useSelector((state:RootState)=>{
        return state.boards
    })
console.log(boards);

    const dispatch = useAppDispatch()
    // useEffect(()=>{
    //     dispatch(createTask(obj))
    //     dispatch(createColumn(objarr))
    // }, [dispatch])


    // const userdata = useSelector((state: any) => {
    //     return state.users
    // })


    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(createUser(userdata))
    // }, [dispatch, userdata])


    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false)


    const handleUserMenuOpeb = (): void => {
        setUserMenuOpen(!userMenuOpen)
    }



    return (
        <header>
            <nav className={styles.navBar}>
                <button onClick={() => dispatch(createColumn(obj))}> column</button>
                <button onClick={() => dispatch(createTask(obj))}> task</button>
                <button onClick={() => dispatch(createBoard(obj))}> board</button>
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
                            <li> <Link to=""> <span><FaRegBell /></span></Link></li>
                            <li> <Link to=""> <span><FaRegCircleQuestion /></span></Link></li>

                            <li>
                                <div className={styles.userPhoto} onClick={handleUserMenuOpeb}>
                                    {user && user.profile ? (
                                        user.profile.photoURL ? (
                                            <img src={user.profile.photoURL} alt="Userphoto" />
                                        ) : <img src="user" alt='user' />
                                    ) : null}

                                </div>
                            </li>
                        </ul>
                        {userMenuOpen ? (
                            <UserSidebar />
                        ) : (null)}

                    </div>
                </div>

            </nav>

        </header>
    )
}


export default Header