import { useAppDispatch } from "entities/hooks/useAppDispatch"
import { RootState } from "entities/redux/store/store"
import { Draggable } from "react-beautiful-dnd"
import { FaPen } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { createTask } from "entities/redux/slices/taskSlice"

interface TodoTaskListProps {
    columnId: string
    boardId: string | undefined
}

const TodoTaskList: React.FC<TodoTaskListProps> = ({ columnId, boardId }) => {



    const allTasks = useSelector((state: RootState) => {
        return state.tasks
    })

    const dispatch = useAppDispatch()

    const handleAddTask = () => {
        const postData = {
            author: "",
            description: "",
            title: ""
        };
        dispatch(createTask({ postData, boardId, columnId }))
    }
    return (
        <>
            {allTasks.map((task, index) => (
                task.columnId === columnId ? (
                    <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <li>
                                    <span>{task.description}</span>
                                    <button onClick={handleAddTask}> <FaPen /> </button>
                                </li>
                            </div>
                        )}
                    </Draggable>
                ) : null
            ))}
        </>

    )
}

export default TodoTaskList