import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { Formik, Form as FormFormik, Field } from 'formik';

import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import UserService from '../API/UserService.js';
import { authActions } from '../store/actions';

import loginImg from '../assets/login.jpg';

import routes from '../routes';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getNotificationConnectionError = () => toast.error(t('errors.network'));

  const [disabledButton, setDisabledButton] = useState(false);

  const [networkError, setNetworkError] = useState(null);
  const [authError, setAuthError] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  useEffect(() => {
    if (networkError) {
      getNotificationConnectionError();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [networkError, t]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setDisabledButton(true);

      const { username, password } = values;
      const user = {
        username,
        password,
      };

      const response = await UserService.login(user);
      dispatch(authActions.setAuth(response.data));

      navigate('/');
    } catch (error) {
      console.error(error);

      if (error.message === 'Network Error') {
        setNetworkError(error);
        return;
      }

      if (error?.response.data.statusCode === 401) {
        setAuthError(error);
      }
    } finally {
      setSubmitting(false);
      setDisabledButton(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={loginImg}
            className="rounded-circle"
            alt={t('login.header')}
          />
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <FormFormik className="col-12 col-md-6 mt-3 mt-md-0" noValidate>
            <h1 className="text-center mb-4">{t('login.header')}</h1>

            <FloatingLabel
              className="mb-3"
              controlId="username"
              label={t('login.username')}
            >
              <Field
                name="username"
                autoComplete="username"
                required
                id="username"
                placeholder={t('login.username')}
                className={`form-control ${authError ? 'is-invalid' : ''}`}
                innerRef={inputRef}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-4"
              controlId="password"
              label={t('login.password')}
            >
              <Field
                type="password"
                name="password"
                autoComplete="current-password"
                required
                id="password"
                placeholder={t('login.password')}
                className={`form-control ${authError ? 'is-invalid' : ''}`}
              />
              {authError && (
                <div className="invalid-tooltip">{t('login.authFailed')}</div>
              )}
            </FloatingLabel>

            <Button
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3"
              disabled={disabledButton}
            >
              {t('login.submit')}
            </Button>
          </FormFormik>
        </Formik>
      </Card.Body>

      <Card.Footer className="p-4">
        <div className="text-center">
          <span>{t('login.newToChat')}</span>
          {'\u00A0'}
          <Link to={routes.signup} replace>
            {t('login.signup')}
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Login;
