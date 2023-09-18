import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import { useData } from "../TodosDataProvider";
import { v4 as uuidv4 } from 'uuid';

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
            setData((prev) => {
                const prevItemIndex = prev?.findIndex(todoItem => todoItem.id === state.id)

                if (prev === null
                    || prevItemIndex === undefined) {
                    return prev
                }

                prev[prevItemIndex].content = todoContent;
                return prev
            })
        } else {
            const newTodo = {
                id: uuidv4(),
                content: todoContent,
                hasCompleted: false
            }
            if (data === null) {
                setData([newTodo])
                navigate("/")
                return
            }
            const newTodos = [...data, newTodo]
            setData(newTodos)
        }

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