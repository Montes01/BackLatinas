import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import { ROUTES } from './lib/constants/routes';
import HomePage from './pages/home';
import GirlsPage from './pages/girls';
import SingleGirl from './pages/single-girl';
import './i18n/i18n';
import HomeAdmin from './components/templates/homeAdmin/homeAdmin';
import Login from './pages/login';
import Profile from './pages/profile';
import { useEffect } from 'react';
import { useAppDispatch } from './lib/contexts/hooks';
import { setUser } from './lib/contexts/auth/authSlice';
import { parseJwt } from './helpers/jwt';
import { tokenName } from './lib/constants/general';
import Comments from './pages/comments';
import Admin from './pages/admin';
import CreateGirl from './pages/createGirl';
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(tokenName);
    if (token) {
      const decoded = parseJwt(token);
      console.log(decoded);
      dispatch(setUser(decoded));
    }
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME.GIRLS} element={<GirlsPage />} />
        <Route path={ROUTES.HOME.HOME} element={<HomePage />} />
        <Route path={ROUTES.GIRL.SINGLE_GIRL} element={<SingleGirl />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CREATE.CLIENT} element={<Register role='client' />} />
        <Route path={ROUTES.CREATE.GIRLS} element={<Register role='girl' />} />
        <Route path={ROUTES.COMMENTS} element={<Comments />} />
        <Route path={ROUTES.PROFILE.CLIENT} element={<Profile />} />
        <Route path={ROUTES.HOME.ADMIN.HOME} element={<HomeAdmin />} />
        <Route path={ROUTES.HOME.ADMIN.GIRLS} element={<Admin />} />
        <Route path={ROUTES.HOME.ADMIN.NEW_GIRL} element={<CreateGirl />} />
        <Route path={ROUTES.HOME.ADMIN.EDIT_GIRL} element={<CreateGirl />} />
        {/* Redireccionamientos */}
        <Route path={ROUTES.HOME.ADMIN.EDIT_GIRL.replace(":username", "*")} element={<Navigate to={ROUTES.HOME.HOME} />} />
        <Route path={ROUTES.ALL} element={<Navigate to={ROUTES.HOME.HOME} />} />
        <Route path={ROUTES.GIRL.ROOT} element={<Navigate to={ROUTES.HOME.HOME} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
