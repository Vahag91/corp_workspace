import React, {useEffect} from "react";
import SideBar from "widgets/SideBar";
import TodoCardList from "widgets/TodoCardList";
import styles from './WorkspacePage.module.css'
import { useSelector } from "react-redux";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { fetchBoard } from "entities/redux/slices/boardsSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const WorkspacePage: React.FC = () => {

    const users = useSelector((state: any) => {
        return state.users
    })
   const { id } = useParams<{ id: string }>()

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