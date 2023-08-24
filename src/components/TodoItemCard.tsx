import { TodoModel } from "../models/TodoModel"
import { MdDelete, MdEdit, MdCheck } from 'react-icons/md'
import { IconContext } from "react-icons";

interface ITodoItemCardProps {
    todoItem: TodoModel,
    deleteCallback: ((todoItem: TodoModel) => void),
    editCallback: ((todoItem: TodoModel) => void),
    markCallback: ((todoItem: TodoModel) => void),
}

const TodoItemCard: React.FC<ITodoItemCardProps> = (
    props: ITodoItemCardProps
) => {
    const { todoItem, deleteCallback, editCallback, markCallback } = props
    return (
        <div className="todoItemContainer">
            <p>{todoItem.content}</p>
            <div className={todoItem.hasCompleted ? "disabledIconsContainer" : "iconsContainer"}>
                {todoItem.hasCompleted
                    ?
                    <p className="doneText">Done</p>
                    :
                    <>
                        <IconContext.Provider value={{ className: "markIcon", size: '30px' }}>
                            <div>
                                <MdCheck onClick={() => markCallback(todoItem)} />
                            </div>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: "editIcon", size: '30px' }}>
                            <div>
                                <MdEdit onClick={() => editCallback(todoItem)} />
                            </div>
                        </IconContext.Provider>
                    </>
                }

                <IconContext.Provider value={{ className: "deleteIcon", size: '30px' }}>
                    <div>
                        <MdDelete onClick={() => deleteCallback(todoItem)} />
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    )
}

export default TodoItemCard