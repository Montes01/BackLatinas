import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './lib/constants/routes'
import HomePage from './pages/home'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME.HOME} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
