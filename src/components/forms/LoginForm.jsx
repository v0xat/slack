import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import { useAuth } from '../../hooks/index.jsx';
import routes from '../../routes.js';

const loginSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'Слишком короткий!')
    .max(20, 'Слишком длинный!')
    .required('Обязательное поле'),
  password: yup.string()
    .required('Обязательное поле'),
});

const LoginForm = () => {
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
    validationSchema: loginSchema,
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
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4"><strong>Войти</strong></h1>
      <Form.Group>
        {/* <Form.Floating className="mb-3"> */}
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
        {/* </Form.Floating> */}
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
  );
};

export default LoginForm;
