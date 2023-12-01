import React, {useEffect} from "react";
import SideBar from "widgets/SideBar";
import TodoCardList from "widgets/TodoCardList";
import styles from './WorkspacePage.module.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const WorkspacePage: React.FC = () => {

    const users = useSelector((state: any) => {
        return state.users
    })


const navigate = useNavigate()


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
        }
    }, [users, navigate])
    
    return (
        <div className={styles.mainDiv}>
            <SideBar />
            <TodoCardList />
         
   
 
        </div>
    )
}

export default WorkspacePage