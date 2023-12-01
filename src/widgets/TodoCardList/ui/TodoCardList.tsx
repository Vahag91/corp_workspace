
import React, { useState,useEffect} from "react"
import styles from './TodoCardList.module.css'
import { FaRegSun, FaPen, FaPlus, FaCanadianMapleLeaf } from "react-icons/fa6"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from "react-redux";
import { RootState } from "entities/redux/store/store";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { createColumn, fetchColumns} from "entities/redux/slices/columnSlice";
import { createTask} from "entities/redux/slices/taskSlice";


const TodoCardList: React.FC = () => {


  const { id } = useParams<{ id: string }>()
  const [title, setTitle] = useState<string>("")
  const [isColumnInputOpen, setIsColumnInputOpen] = useState<boolean>(false)
  const [taskDescription, setTaskDescription] = useState<string>("")
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null)


  const allColumns = useSelector((state: RootState) => {
    return state.column
  })

  

  const postData = {
    author: "f",
    description: "f",
    title: "f",
  }

  const dispatch = useAppDispatch()

  const onDragEnd = (result: any) => {
    // const { source, destination } = result;

    // if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
    //   return;
    // }

    // const sourceColumn = allColumns.find((column) => column.id === source.droppableId);
    // const destinationColumn = allColumns.find((column) => column.id === destination.droppableId);

    // if (!sourceColumn || !destinationColumn) {
    //   return;
    // }
    // const movedTask = sourceColumn.tasks[source.index];

    // const updatedSourceColumn = {
    //   ...sourceColumn,
    //   tasks: sourceColumn.tasks.filter((task) => task.id !== movedTask.id),
    // };

    // const updatedDestinationColumn = {
    //   ...destinationColumn,
    //   tasks: [
    //     ...destinationColumn.tasks.slice(0, destination.index),
    //     movedTask,
    //     ...destinationColumn.tasks.slice(destination.index),
    //   ],
    // };

    // dispatch(updateColumn([updatedSourceColumn, updatedDestinationColumn]) as any);
  };



  const handlenewColumn = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const addedColumn: string = event.target.value.trim()
    if (addedColumn !== "") {
      setTitle(addedColumn)
    }
  }

  const handleColumnUpdate = () => {
    if (title) {
      dispatch(createColumn({ postData, boardId, title }))
    }
    setTitle("")
    setIsColumnInputOpen(false)
  }



  const handleNewtask = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const addedTask: string = event.target.value
    if (addedTask !== "") {
      setTaskDescription(addedTask)
    }
  }


  const handleTaskUpdate = () => {
    if (taskDescription && activeColumnId) {
      const postData = {
        id: "",
        author: "",
        description: taskDescription,
        title: ""
      };
      dispatch(createTask({ postData, boardId, columnId: activeColumnId }));
   
    }
    setTaskDescription("");
    setActiveColumnId(null);
  };


  const handleEditTask = (columnId: string) => {
    setActiveColumnId(columnId);
  }

  const boardId = id

useEffect(()=>{


  if(boardId){
    dispatch(fetchColumns(boardId))
    console.log(allColumns);
    
  }
},[dispatch,boardId,allColumns])



    return (

    <div className={styles.mainBoard}>
      <DragDropContext onDragEnd={onDragEnd}>
        {allColumns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.mainDiv} >
                <li className={styles.todoCard}>
                  <div className={styles.todo}>
                    <div className={styles.title}>
                      <h2>{column.title}</h2>
                      <button> <FaRegSun /></button>
                    </div>

                    <ol className={styles.list}>
                      {column.tasks && column.tasks.map((task, index) => (
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
                                <button> <FaPen /> </button>
                              </li>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </ol>
                    {provided.placeholder}
                  </div>




                  <div className={styles.addBtn}>
                    {activeColumnId === column.id ? (
                      <div className={styles.addBtnInput}>
                        <input
                          type="text"
                          name="tast"
                          id="tast"
                          value={taskDescription}
                          onChange={handleNewtask}
                        />
                        <button
                          onClick={handleTaskUpdate}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => handleEditTask(column.id)}>
                          <FaPlus /> <span>Add Card</span>
                        </button>
                        <button>
                          <FaCanadianMapleLeaf />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              </div>
            )}
          </Droppable >
        ))}
      </DragDropContext >



      {isColumnInputOpen ? (
        <div className={styles.addColumnInput}>
          <input type="text"
            value={title}
            onChange={handlenewColumn} />
          <button onClick={handleColumnUpdate}> Save</button>
        </div>
      ) : (<div>
        < button
          className={styles.addCardBtn}
          onClick={() => setIsColumnInputOpen(true)}> <span><FaPlus /> Add Card</span></button >
      </div>)}


    </div >
  )
}


export default TodoCardList