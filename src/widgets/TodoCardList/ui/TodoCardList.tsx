
import React, { useState, useEffect } from "react"
import styles from './TodoCardList.module.css'
import { FaRegSun, FaPlus, FaCanadianMapleLeaf } from "react-icons/fa6"
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector } from "react-redux";
import { RootState } from "entities/redux/store/store";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "entities/hooks/useAppDispatch";
import { createColumn, fetchColumns, updateColumn } from "entities/redux/slices/columnSlice";
import { createTask } from "entities/redux/slices/taskSlice";
import TodoTaskList from "widgets/TodoTaskList";


const TodoCardList: React.FC = () => {


  const { id } = useParams<{ id: string }>()
  const [title, setTitle] = useState<string>("")
  const [isColumnInputOpen, setIsColumnInputOpen] = useState<boolean>(false)
  const [taskDescription, setTaskDescription] = useState<string>("")
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<boolean>(false)
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("")

  const allColumns = useSelector((state: RootState) => {
    return state.column
  })

  const handleChangeSelectedColumn = (columnId: string) => {
    setSelectedColumnId(columnId);
  };

  const handleChangeUpdateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle: string = event.target.value
    if (newTitle !== "") {
      setUpdatedTitle(newTitle)
    }
  }


  const handleUpdateColumnTitle = (columnId: string) => {
    if(updatedTitle){
      dispatch(updateColumn({ postData: { title: updatedTitle }, columnId, boardId }))
    
    }
      setUpdatedTitle("")
      setSelectedColumn(!selectedColumn)
      setSelectedColumnId(null)
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
      dispatch(createColumn({ boardId, title }))
    }
    console.log("createColumn");

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
        author: "",
        description: taskDescription,
        title: "",
      };
      dispatch(createTask({ postData, boardId, columnId: activeColumnId }));
      console.log("createTask");

    }
    setTaskDescription("");
    setActiveColumnId(null);
  };


  const handleEditTask = (columnId: string) => {
    setActiveColumnId(columnId);
  }

  const boardId = id


  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId))
    }
  }, [dispatch, boardId])



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
                      {selectedColumnId === column.id ? (
                        <>
                          <input
                            type="text"
                            name="column"
                            id="column"
                            placeholder={column.title}
                            onChange={handleChangeUpdateTitle}
                          />
                          <button onClick={() => handleUpdateColumnTitle(column.id)}> click</button>
                        </>
                      ) : (
                        <>
                          <h2>{column.title}</h2>
                          <button onClick={() => handleChangeSelectedColumn(column.id)}> <FaRegSun /></button>
                        </>
                      )}

                    </div>

                    <ol className={styles.list}>
                      <TodoTaskList key={column.id} columnId={column.id} boardId={boardId} />
                    </ol>
                    {provided.placeholder}
                  </div>




                  <div className={styles.addBtn}>
                    {activeColumnId === column.id ? (
                      <div className={styles.addBtnInput}>
                        <input
                          type="text"
                          name="task"
                          id="task"
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