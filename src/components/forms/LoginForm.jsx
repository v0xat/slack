import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';

import { useUser } from '../../hooks/index.jsx';
import routes from '../../routes.js';

const loginSchema = yup.object().shape({
  username: yup.string()
    .required('Обязательное поле'),
  password: yup.string()
    .required('Обязательное поле'),
});

const LoginForm = ({ history, location }) => {
  const usernameRef = useRef();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const user = useUser();
  const [submitFailed, setSubmitFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        console.log(user);
        const { data } = await axios.post(routes.loginPath(), values);
        user.logIn(data);

        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);

        setSubmitFailed(false);
      } catch (err) {
        if (err.response.status === 401) {
          setSubmitFailed(true);
          usernameRef.current.select();
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
          ref={usernameRef}
          isInvalid={submitFailed}
          autoFocus
          required
        />
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
          isInvalid={submitFailed}
          required
        />
        <Form.Control.Feedback type="invalid">
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary" disabled={formik.isSubmitting}>Войти</Button>
    </Form>
  );
};

export default LoginForm;
