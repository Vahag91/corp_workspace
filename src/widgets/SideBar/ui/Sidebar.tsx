import React from "react";
import styles from "./Sidebar.module.css";
import { FaClipboardUser, FaClone, FaHouseUser, FaShieldHeart, FaEye, FaPeopleGroup, FaScrewdriverWrench } from "react-icons/fa6";
import { Link } from "react-router-dom";




const SideBar: React.FC = () => {

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
                    <li> <Link to="#"> <span> Main </span> </Link>

                        <ul>
                            <li>  <Link to="#"><span><FaClipboardUser /> Boards</span>       </Link>  </li>
                            <li>  <Link to="#"><span><FaShieldHeart /> Highlights</span>     </Link>  </li>
                            <li>  <Link to="#"><span><FaEye /> Views</span>                  </Link>  </li>
                            <li>  <Link to="#"><span><FaPeopleGroup /> Members</span>        </Link>  </li>
                            <li>  <Link to="#"><span><FaScrewdriverWrench /> Settings</span> </Link>  </li>
                        </ul>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar