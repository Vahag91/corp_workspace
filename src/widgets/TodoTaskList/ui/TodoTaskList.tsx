import { useEffect, useState } from "react"
import { useAppDispatch } from "entities/hooks/useAppDispatch"
import { RootState } from "entities/redux/store/store"
import { Draggable } from "react-beautiful-dnd"
import { FaPen } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { fetchTask, updateTask } from "entities/redux/slices/taskSlice"

interface TodoTaskListProps {
    columnId: string
    boardId: string | undefined
}


interface TaskEditState {
    [taskId: string]: boolean;
}


const TodoTaskList: React.FC<TodoTaskListProps> = ({ columnId, boardId }) => {



    const allTasks = useSelector((state: RootState) => {
        return state.tasks
    })
    const [description, setDescription] = useState<string>("")
    const [editStates, setEditStates] = useState<TaskEditState>({});
    const dispatch = useAppDispatch()


    const handleUpdatetask = (taskId: string) => {
        const postData = {
            author: "",
            description,
            title: ''
        }
        dispatch(updateTask({ postData, boardId, columnId, taskId }))
        setDescription("")
        setEditStates((prevEditStates) => ({ ...prevEditStates, [taskId]: false }));
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addedDescription: string = event.target.value
        if (addedDescription !== "") {
            setDescription(addedDescription)
        }
    }

    const handleChangeIsEdit = (taskId: string) => {
        setEditStates((prevEditStates) => ({ ...prevEditStates, [taskId]: true }));

    }

    useEffect(() => {
        dispatch(fetchTask({ boardId, columnId }))
    }, [dispatch])




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
                                    {editStates[task.id] ? (
                                        <>
                                            <input
                                                type="text"
                                                name="description"
                                                id="description"
                                                value={description}
                                                onChange={handleChangeDescription} />
                                            <button onClick={() => handleUpdatetask(task.id)}> Save</button>
                                        </>
                                    ) : (
                                        <>
                                            <span>{task.description}</span>
                                            <button onClick={() => handleChangeIsEdit(task.id)}> <FaPen /> </button>
                                        </>
                                    )}

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