import { useEffect } from "react"
import SideBar from 'widgets/SideBar'
import Board from 'widgets/Board'
import styles from './BoardPage.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { RootState } from "entities/redux/store/store"

const BoardPage: React.FC = () => {


    const users = useSelector((state: RootState) => {
        return state.users.profile
    })

    const navigate = useNavigate()


    useEffect(() => {
        if (!users?.photoURL) {
            navigate("/login")
        }
    }, [users, navigate])


    return (
        <div className={styles.board}>
            <div className={styles.boardContent}>
                <SideBar />
                <Board />
            </div>
        </div>
    )
}

export default BoardPage