import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { routes } from './lib/constants/routes'
import { Home } from './components/organisms/home'
function App() {

  return (
    <BrowserRouter>
      <Route path={routes.HOME.BASE}> <h1>Home</h1> </Route>
      <Route path={routes.HOME.HOME}>
        <Home />
      </Route>
    </BrowserRouter>
  )
}

export default App
