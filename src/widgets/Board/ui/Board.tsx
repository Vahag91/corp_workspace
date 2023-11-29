import { useState } from 'react';
import styles from './Board.module.css'
import { FaPen, FaClipboardUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { RootState } from 'entities/redux/store/store';
import { Boards, setBoard } from 'entities/redux/slices/boardSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Board: React.FC = () => {

    const [title, setTitle] = useState<string>(" Working place Trello")
    const [newBoard, setNewBoard] = useState<string>("")
    const [isBoardOpen, setIsBoardOpen] = useState<boolean>(false)
    const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false)


    const myBoard = useSelector((state: RootState) => {
        return state.board.boardList
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const hanldeNewBoard = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const addedBoard: string = event.target.value.trim()
        if (addedBoard !== "") { setNewBoard(addedBoard) }
    }

    const getRandomColor = (): string => {

        const randomNumber = () => Math.floor(Math.random() * 256);
        const red = randomNumber();
        const green = randomNumber();
        const blue = randomNumber();

        return `rgb(${red}, ${green}, ${blue})`;
    };

    const handleChangeInput = (): void => {
        const randomColor = getRandomColor()
        if (newBoard) {
            dispatch(setBoard({ name: newBoard, color: randomColor }));
        }
        setNewBoard("")
        setIsBoardOpen(!isBoardOpen)
    }

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newTitle: string = event.target.value
        setTitle(newTitle)
    }

    const handleNavigate = (): void => {
        navigate('/workspace')
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
                            {myBoard.map((item: Boards, index: number) => {
                                return (
                                    <li key={index}>
                                        <button style={{ backgroundColor: item.color }}
                                            className={styles.boardBodyButton}
                                            onClick={handleNavigate}>
                                            <span>{item.name}</span>
                                        </button>
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
                                    <button className={styles.addButton} onClick={handleChangeInput}>
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <button className={styles.addBoardBtn} onClick={handleChangeInput} >
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