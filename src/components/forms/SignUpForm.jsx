import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { useUser } from '../../hooks/index.jsx';
import validation from '../../utils/validationSchemas';
import routes from '../../utils/routes.js';

const SignUpForm = ({ history, location }) => {
  const { t } = useTranslation();
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
      confirmPassword: '',
    },
    validationSchema: validation.signUpSchema(t),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, actions) => {
      try {
        const { username, password } = values;
        const { data } = await axios.post(routes.signupPath(), { username, password });
        user.logIn(data);

        const { from } = location.state || { from: { pathname: '/chat' } };
        history.replace(from);

        setSubmitFailed(false);
      } catch (err) {
        if (err.response.status === 409) {
          setSubmitFailed(true);
          actions.setFieldError('confirmPassword', t('errors.userExists'));
          usernameRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4"><strong>{t('global.signUp')}</strong></h1>
      <Form.Group>
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder={t('global.username')}
          name="username"
          id="username"
          autoComplete="username"
          autoFocus
          isInvalid={
            submitFailed || (formik.touched.username && !!formik.errors.username)
          }
          required
          ref={usernameRef}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder={t('global.password')}
          name="password"
          id="password"
          autoComplete="new-password"
          isInvalid={
            submitFailed || (formik.touched.password && !!formik.errors.password)
          }
          required
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder={t('global.confirmPassword')}
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          isInvalid={
            submitFailed || (formik.touched.confirmPassword && !!formik.errors.confirmPassword)
          }
          required
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="w-100 btn btn-outline-primary" variant="outline-primary" disabled={formik.isSubmitting}>{t('global.signUp')}</Button>
    </Form>
  );
};

export default SignUpForm;
