import { FC, createContext, useContext, useState } from "react";
import { TodosDataProviderProps } from './types/todosDataProviderProps'
import { TodosDataProviderContext } from "./types/todosDataProviderContext";
import { Todo } from "./types/todo";

export const DataContext = createContext<TodosDataProviderContext | null>(null);

export const TodosDataProvider: FC<TodosDataProviderProps> = ({ children }) => {
    const [data, setData] = useState<Todo[] | null>(null);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => {
    const context = useContext(DataContext)

    if (!context) {
        throw new Error('context is null')
    }

    return context
};