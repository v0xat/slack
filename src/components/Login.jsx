import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const SignupSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'Слишком короткий!')
    .max(12, 'Слишком длинный!')
    .required('Обязательное поле'),
  password: yup.string()
    .min(5, 'Слишком короткий!')
    .max(40, 'Слишком длинный!')
    .required('Обязательное поле'),
});

const Login = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <h1 className="text-center mb-4">Войти</h1>
            <Form.Group>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Ваш ник"
                name="username"
                id="username"
                autoComplete="username"
                autoFocus
                isInvalid={authFailed || formik.errors.username}
                isValid={formik.touched.username && !formik.errors.username}
                required
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Пароль"
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={authFailed || formik.errors.password}
                isValid={formik.touched.password && !formik.errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password ? formik.errors.password : 'Неверные имя пользователя или пароль'}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary">Войти</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
