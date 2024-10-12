import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './lib/constants/routes';
import HomePage from './pages/home';
import GirlsPage from './pages/girls';
import SingleGirl from './pages/single-girl';
import LoginAdmin from './components/templates/loginAdmin';
import LoginClient from './components/templates/loginClient';
import LoginGirls from './components/templates/loginGirls';
import './i18n/i18n';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME.GIRLS} element={<GirlsPage />} />
        <Route path={ROUTES.HOME.HOME} element={<HomePage />} />
        <Route path={ROUTES.GIRL.SINGLE_GIRL} element={<SingleGirl />} />
        <Route path={ROUTES.LOGIN.ADMIN} element={<LoginAdmin />} />
        <Route path={ROUTES.LOGIN.CLIENT} element={<LoginClient />} />
        <Route path={ROUTES.LOGIN.GIRLS} element={<LoginGirls />} />

        {/* Redireccionamientos */}
        <Route path={ROUTES.ALL} element={<Navigate to={ROUTES.HOME.HOME} />} />
        <Route path={ROUTES.GIRL.ROOT} element={<Navigate to={ROUTES.HOME.HOME} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
