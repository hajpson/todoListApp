import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './pages/StartPage'
import NewTodoPage from './pages/NewTodoPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/addTodo" element={<NewTodoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
