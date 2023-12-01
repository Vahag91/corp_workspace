import React, { useEffect } from "react";
import styles from "./Sidebar.module.css";
import { FaClipboardUser, FaClone, FaHouseUser,} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "entities/redux/store/store";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { fetchBoards } from "entities/redux/slices/boardsSlice";

const SideBar: React.FC = () => {



    const allBoards = useSelector((state: RootState) => {
        return state.boards
    })

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);


    return (
        <div className={styles.sideBar}>

            <div className={styles.sideBarHead}>
                <ul>
                    <li>
                        <Link to="#"><span> <FaClipboardUser /> Boards</span> </Link>
                    </li>

                    <li>
                        <Link to="#"><span> <FaClone /> Template</span> </Link>
                    </li>

                    <li>
                        <Link to="#"><span> <FaHouseUser /> Home</span> </Link>
                    </li>
                </ul>
            </div>

            <div className={styles.sideBarBody}>
                <ul>
                    <li> <Link to="#"> <span> Boards </span> </Link>

                        <ul>
                            {allBoards.map((board,index) => {
                                return (
                                    <li>  <Link to={`/article/${board.id}`}><span><FaClipboardUser /> {`Board ${index + 1}`} </span> </Link></li>

                                )
                            })}


                            {/* <li>  <Link to="#"><span><FaShieldHeart /> Highlights</span>     </Link>  </li>
                            <li>  <Link to="#"><span><FaEye /> Views</span>                  </Link>  </li>
                            <li>  <Link to="#"><span><FaPeopleGroup /> Members</span>        </Link>  </li>
                            <li>  <Link to="#"><span><FaScrewdriverWrench /> Settings</span> </Link>  </li> */}
                        </ul>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar