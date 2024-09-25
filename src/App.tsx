import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './lib/constants/routes'
import { Home } from './components/organisms/home'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
