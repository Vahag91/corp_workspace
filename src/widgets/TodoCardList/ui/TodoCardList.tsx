
import React, { ReactNode, useState } from "react"
import styles from './TodoCardList.module.css'
import { FaRegSun, FaPen, FaPlus, FaCanadianMapleLeaf } from "react-icons/fa6"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import { useDispatch } from "react-redux";
import { setCard, setColumn } from "redux/slices/todoCardSlice";



const TodoCardList: React.FC = () => {

  const [taskContent, setTaskContent] = useState<string>("")
  const [isTaskCardOpen, setIsTaskCardOpen] = useState<boolean>(false)

  const myColumns = useSelector((state: RootState) => {
    return state.todo
  })


  const onDragEnd = () => {

  }



  const dispatch = useDispatch()

  const handleChange = () => {
    const id = "col" + Math.floor(Math.random() * 10000)

    const newColumn = {
      id,
      title: "Todo",
      cards: []
    }
    dispatch(setColumn(newColumn))


  }


  const handleAddTask = (columnId: string, newContent: string): void => {
    if (newContent === "") {
      setIsTaskCardOpen(false)
      return
    }
    const cards = { id: "2", content: newContent }
    setIsTaskCardOpen(false)
    dispatch(setCard({ columnId, card: cards }))
    setTaskContent("")
  }

  const handleEditTask = () => {
    setIsTaskCardOpen(true)
  }



  return (
    <div className={styles.mainBoard}>


      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="5">
          {
            (provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.mainDiv}>

                {myColumns.columns.map((item, index): ReactNode => {
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {
                        (provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <li className={styles.todoCard}>
                                <div className={styles.todo}>

                                  <div className={styles.title}>
                                    <h2> {item.title} </h2>
                                    <button> <FaRegSun /></button>
                                  </div>

                                  <Droppable droppableId="5">
                                    {(provided) => (
                                      <div ref={provided.innerRef} {...provided.droppableProps} className={styles.mainDiv}>
                                        <ol className={styles.list}>
                                          {item.cards.map((card, index): ReactNode => {
                                            return (
                                              <li key={index}>
                                                <span> {card.content}</span>
                                                <button> <FaPen /> </button>
                                              </li>
                                            );
                                          })}


                                        </ol>
                                      </div>
                                    )}
                                  </Droppable>

                                </div>

                                <div className={styles.addBtn}>
                                  {isTaskCardOpen ? (
                                    <div className={styles.addBtnInput}>
                                      <input
                                        type="text"
                                        name="tast"
                                        id="tast"
                                        value={taskContent}
                                        onChange={(event) => setTaskContent(event.target.value)} />
                                      <button onClick={() => { handleAddTask(item.id, taskContent) }}>Save</button>
                                    </div>
                                  ) : (
                                    <>
                                      <button onClick={handleEditTask}> <FaPlus /> <span>Add Card</span></button>
                                      <button><FaCanadianMapleLeaf /> </button>
                                    </>
                                  )}

                                </div>
                              </li>
                            </div>
                          )
                        }
                      }

                    </Draggable>)
                })

                }

              </div>
            )
          }

        </Droppable>

      </DragDropContext >

      <button className={styles.addCardBtn} onClick={handleChange}> <span><FaPlus /> Add Card</span></button>


    </div>
  )
}


export default TodoCardList