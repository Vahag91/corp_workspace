import React, {useEffect} from "react";
import SideBar from "widgets/SideBar";
import TodoCardList from "widgets/TodoCardList";
import styles from './WorkspacePage.module.css'
import { useSelector } from "react-redux";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { fetchBoard } from "entities/redux/slices/boardsSlice";
import { useParams } from "react-router-dom";




const WorkspacePage: React.FC = () => {

    const boards = useSelector((state: any) => {
        return state.boards
    })
   const { id } = useParams<{ id: string }>()


    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchBoard());
    //   }, [dispatch]);
    
    return (
        <div className={styles.mainDiv}>
            <SideBar />
            <TodoCardList />
         
   
 
        </div>
    )
}

export default WorkspacePage