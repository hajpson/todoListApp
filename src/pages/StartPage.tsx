import '../App.css'
import { Link, useNavigate } from "react-router-dom"
import TodoItemCard from '../components/TodoItemCard'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
import { useData } from '../TodosDataProvider'
import { Todo } from '../types/todo';

const StartPage = () => {
    const { data, setData } = useData()
    const navigate = useNavigate()

    const deleteTodoCallback = (
        todo: Todo
    ) => {
        const newData = data?.filter((item) => item.id !== todo.id)

        setData(newData || null)

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
        todo: Todo
    ) => {
        navigate("/addTodo", { state: todo })
    }

    const markCallback = (
        todo: Todo
    ) => {
        if (data === null) {
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

        const todosCopy = [...data]

        const wantedIndex = todosCopy.findIndex(todoItem => todoItem.id === todo.id);
        todosCopy[wantedIndex].hasCompleted = true;

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
            <div style={{ marginBottom: data?.length === 0 ? '12px' : '0px' }}>
                {data?.length === 0
                    ?
                    <p>Looks like you don't have any todos. Click the button to add the first one.</p>
                    :
                    <div>
                        {data?.map(todoItem => (
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