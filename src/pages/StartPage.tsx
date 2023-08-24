import '../App.css'
import { Link, useNavigate } from "react-router-dom"
import { deleteTodo, getTodos, markTodo } from '../fakeData'
import { useState } from 'react'
import TodoItemCard from '../components/TodoItemCard'
import { TodoModel } from '../models/TodoModel'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'

const StartPage = () => {
    const [todos, setTodos] = useState(getTodos)
    const navigate = useNavigate()

    const deleteTodoCallback = (
        todo: TodoModel
    ) => {
        const isTodoDeleted = deleteTodo(todo)

        if (!isTodoDeleted) {
            toast.error("Something went wrong", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            })
            return
        }

        toast.success("Todo deleted successfully", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        })
        setTodos(getTodos)
    }

    const editTodoCallback = (
        todo: TodoModel
    ) => {
        navigate("/addTodo", { state: todo })
    }

    const markCallback = (
        todo: TodoModel
    ) => {
        toast.success("Todo marked as done", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        })

        setTodos(markTodo(todo))
    }

    return (
        <div>
            <h1 className='header'>Todo list app</h1>
            <div style={{ marginBottom: todos.length === 0 ? '12px' : '0px' }}>
                {todos.length === 0
                    ?
                    <p>Looks like you don't have any todos. Click the button to add the first one.</p>
                    :
                    <div>
                        {todos.map(todoItem => (
                            <div key={todoItem.id} className='todosContainer'>
                                <TodoItemCard
                                    deleteCallback={deleteTodoCallback}
                                    editCallback={editTodoCallback}
                                    markCallback={markCallback}
                                    todoItem={todoItem} />
                            </div>
                        )
                        )}
                    </div>
                }
                <Link to="/addTodo"><button className='mainButton'>Add new todo</button></Link>
                <ToastContainer />
            </div>
        </div>
    )
}

export default StartPage