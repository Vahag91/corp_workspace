import { useState, useEffect } from 'react';
import styles from './Board.module.css'
import { FaPen, FaClipboardUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { RootState } from 'entities/redux/store/store';
import { useAppDispatch } from 'entities/hooks/useAppDispatch';
import { createBoard, fetchBoards } from 'entities/redux/slices/boardsSlice';
import { Link } from 'react-router-dom';


const Board: React.FC = () => {

    const [title, setTitle] = useState<string>(" Working place TaskCraft")
    const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false)

    const [newBoard, setNewBoard] = useState<string>("")
    const [isBoardOpen, setIsBoardOpen] = useState<boolean>(false)



    const postData = {
        author: "",
        description: "",
        title: "",
    }

    const allBoards = useSelector((state: RootState) => {
        return state.boards
    })

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);



    const hanldeNewBoard = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const addedBoard: string = event.target.value.trim()
        if (addedBoard !== "") { setNewBoard(addedBoard) }
    }



    const handleChangeBoard = () => {

        if (newBoard) {
            dispatch(createBoard(postData));
        }
        setNewBoard("")
        setIsBoardOpen(!isBoardOpen)
    }




    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newTitle: string = event.target.value
        setTitle(newTitle)
    }



    return (

        <div className={styles.mainBoard}>
            <div className={styles.boardHeader}>
                <div className={styles.boardHeaderTitle}>
                    <h2> T </h2>
                </div>


                <div className={styles.boardHeaderBody}>
                    {isTitleOpen ?
                        (<input
                            type='text'
                            placeholder='Enter here'
                            value={title}
                            onChange={handleChangeTitle} />) : (
                            <h2> {title}</h2>)}

                    <button
                        className={styles.boadHeaderbtn}
                        onClick={() => { setIsTitleOpen(!isTitleOpen) }}>
                        <span> <FaPen /></span>
                    </button>
                </div>

            </div>



            <div className={styles.boardBody}>
                <div className={styles.board}>
                    <h2> <FaClipboardUser />  Your Boards</h2>

                    <div className={styles.boardList}>
                        <ul>
                            {allBoards.map((column: any, id: any) => {
                                return (
                                    <li key={column.id}>
                                        <Link to={`/article/${column.id}`}>
                                            <button
                                                className={styles.boardBodyButton}

                                            >   <span>{id+1}</span>
                                            </button>
                                        </Link>
                                    </li>
                                )
                            })}

                            {isBoardOpen ? (
                                <div className={styles.inputContainer}>
                                    <input className={styles.inputField}
                                        type="text"
                                        placeholder='Enter new board name'
                                        value={newBoard}
                                        onChange={hanldeNewBoard}
                                    />
                                    <button className={styles.addButton} onClick={handleChangeBoard}>
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <button className={styles.addBoardBtn} onClick={handleChangeBoard} >
                                    <span className={styles.boardAddBtn}> Create New Board</span>
                                </button>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board