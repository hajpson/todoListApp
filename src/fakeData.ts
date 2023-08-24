import { TodoModel } from "./models/TodoModel";

let Todos: Array<TodoModel>;

const initialize = () => {
    if (Todos === undefined) {
        Todos = new Array<TodoModel>
    }
}

export const addTodo = (
    todo: TodoModel
) => {
    initialize()
    Todos.unshift(todo)
}

export const editTodo = (
  todo: TodoModel
) => {
    initialize()
    const wantedIndex = Todos.findIndex(todoItem => todoItem.id === todo.id)
    Todos[wantedIndex].content = todo.content
}

export const deleteTodo = (
    todo: TodoModel
) => {
    initialize()

    const filteredTodos = Todos.filter(todoItem => todoItem.id !== todo.id)
    
    if (Todos.length === filteredTodos.length) {
        return false
    }

    Todos = filteredTodos
    return true
}

export const getTodos = () => {
    initialize()

    return Todos
}

export const markTodo = (
    todo: TodoModel
) => {
    initialize()

    const todosCopy = [...Todos]
    const wantedIndex = todosCopy.findIndex(todoItem => todoItem.id === todo.id)
    todosCopy[wantedIndex].hasCompleted = true

    return todosCopy
}