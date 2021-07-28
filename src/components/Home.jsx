/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const HomePage = () => (
  <div className="d-flex flex-column align-items-center">
    <h1 className="mt-5 mb-4">Привет!</h1>
    <p style={{ fontSize: 19 }}>
      Ты находишься на главной странице приложения-чата, сделанного в рамках
      <a href="https://ru.hexlet.io/programs/frontend/projects/12"> проекта </a>
      на Hexlet.
      <br />
      Проект не завершён, поэтому для входа в чат используйте данные пользователя
      <mark> admin </mark> (username: <mark>admin</mark>, password: <mark>admin</mark>)
      <br />
      Какие технологии я использовал:
    </p>
    <ul style={{ fontSize: 19 }}>
      <li>React, Redux-toolkit</li>
      <li>Socket.io</li>
      <li>Bootstrap</li>
      <li>Webpack</li>
      <li>Formik</li>
    </ul>
  </div>
);

export default HomePage;
