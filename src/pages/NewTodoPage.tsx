import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { TodoModel } from "../models/TodoModel"
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import { useData } from "../TodosDataProvider";

const NewTodoPage = () => {
    const isInEditMode = useRef(false)

    const { data, setData } = useData()
    const [todoContent, setTodoContent] = useState('')
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        if (state !== null && state !== undefined) {
            isInEditMode.current = true;
            setTodoContent(state.content)
        } else {
            isInEditMode.current = false;
        }
    }, [state])

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        if (todoContent === null || todoContent === "") {
            toast.warning("What do you want to do?!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            })
            return;
        }

        if (isInEditMode.current === true) {
            const editedTodo = new TodoModel(state.id, todoContent)
            const wantedIndex = data.findIndex(todoItem => todoItem.id === editedTodo.id)
            data[wantedIndex].content = editedTodo.content
            navigate("/")

            return
        }

        const newTodo = new TodoModel(uuidv4(), todoContent)
        setData([...data, newTodo])
        navigate("/")
    }

    const handleTodoContentOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault()
        setTodoContent(event.target.value)
    }

    return (
        <div className="newTodoPageContainer">
            <h1 className='header'>
                {
                    isInEditMode.current
                        ?
                        "Edit todo"
                        :
                        "Add new todo"
                }
            </h1>
            <form className="form" onSubmit={handleSubmit}>
                <input className="formInput" value={todoContent} onChange={handleTodoContentOnChange} type="text" placeholder="What to do?" />
                <button type="submit" className="mainButton">
                    {isInEditMode.current
                        ?
                        "Edit todo"
                        :
                        "Add todo"
                    }
                </button>
                <ToastContainer />
            </form>
            <Link to="/"><button className='mainButton'>Go back</button></Link>
        </div>
    )
}

export default NewTodoPage