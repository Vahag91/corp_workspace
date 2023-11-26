import React from "react";
import SideBar from "widgets/SideBar";
import TodoCardList from "widgets/TodoCardList";
import styles from './WorkspacePage.module.css'




const WorkspacePage: React.FC = () => {


    return (
        <div className={styles.mainDiv}>
            <SideBar />
            <TodoCardList />

        </div>
    )
}

export default WorkspacePage