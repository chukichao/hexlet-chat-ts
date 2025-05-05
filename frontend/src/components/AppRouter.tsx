import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { getToken } from '../store/selectors';

import MainPage from '../pages/MainPage.jsx';

import AuthPage from '../pages/AuthPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';

import NotFoundPage from '../pages/NotFoundPage.jsx';

import Chat from './Chat.jsx';

import routes from '../routes';

const AppRouter = () => {
  const token = useSelector(getToken);
  const privateRoutes = token ? (
    <Route index element={<Chat />} />
  ) : (
    <Route index element={<Navigate to={routes.login} replace />} />
  );

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        {privateRoutes}

        <Route path={routes.login} element={<AuthPage />}>
          {token && <Route index element={<Navigate to="/" replace />} />}
          <Route index element={<LoginPage />} />
        </Route>

        <Route path={routes.signup} element={<AuthPage />}>
          <Route index element={<SignupPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
