import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Вернуться домой...
    </Link>
  </div>
);

export default PageNotFound;
