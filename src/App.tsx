import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './lib/constants/routes'
import HomePage from './pages/home'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME.HOME} element={<HomePage />} />
        <Route
          path={ROUTES.ALL}
          element={<Navigate to={ROUTES.HOME.HOME} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
