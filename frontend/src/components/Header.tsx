import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button.js';

import { getToken } from '../store/selectors';
import { authActions } from '../store/actions';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.removeAuth());
  };

  const token = useSelector(getToken);
  const logoutButton = token ? (
    <Button onClick={handleLogout}>{t('logout')}</Button>
  ) : null;

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Link className="navbar-brand" to="/">
          {t('hexletChat')}
        </Link>
        {logoutButton}
      </Container>
    </Navbar>
  );
};

export default Header;
