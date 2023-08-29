import '../App.css'
import { Link, useNavigate } from "react-router-dom"
import TodoItemCard from '../components/TodoItemCard'
import { TodoModel } from '../models/TodoModel'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
import { useData } from '../TodosDataProvider'

const StartPage = () => {
    const { data, setData } = useData()
    const navigate = useNavigate()

    const deleteTodoCallback = (
        todo: TodoModel
    ) => {
        const newData = data.filter((item) => item.id !== todo.id)

        setData(newData)

        toast.success("Todo deleted successfully", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        })
    }

    const editTodoCallback = (
        todo: TodoModel
    ) => {
        navigate("/addTodo", { state: todo })
    }

    const markCallback = (
        todo: TodoModel
    ) => {
        const todosCopy = [...data]
        const wantedIndex = todosCopy.findIndex(todoItem => todoItem.id === todo.id)
        todosCopy[wantedIndex].hasCompleted = true

        setData(todosCopy)

        toast.success("Todo marked as done", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        })
    }

    return (
        <div>
            <h1 className='header'>Todo list app</h1>
            <div style={{ marginBottom: data.length === 0 ? '12px' : '0px' }}>
                {data.length === 0
                    ?
                    <p>Looks like you don't have any todos. Click the button to add the first one.</p>
                    :
                    <div>
                        {data.map(todoItem => (
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