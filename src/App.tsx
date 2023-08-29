import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import NewTodoPage from './pages/NewTodoPage'
import { TodosDataProvider } from './TodosDataProvider'

function App() {

  return (
    <TodosDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/addTodo" element={<NewTodoPage />} />
        </Routes>
      </BrowserRouter>
    </TodosDataProvider>
  )
}

export default App
