import { TodoModel } from "../models/TodoModel"

export type TodosDataProviderContext = {
    data: TodoModel[],
    setData: React.Dispatch<React.SetStateAction<TodoModel[]>>
}