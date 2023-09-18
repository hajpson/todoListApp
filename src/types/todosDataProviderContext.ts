import { Todo } from "./todo"

export type TodosDataProviderContext = {
    data: Todo[] | null,
    setData: React.Dispatch<React.SetStateAction<Todo[] | null>>
}