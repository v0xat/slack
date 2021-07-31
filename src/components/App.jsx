import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import ModalsController from './modals/ModalsController.jsx';
import Chat from './Chat.jsx';
import Home from './Home.jsx';
import PageNotFound from './PageNotFound.jsx';
import authContext from '../context/auth.jsx';
import { useAuth } from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const AuthButton = () => {
  const auth = useContext(authContext);

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : <Button as={Link} to="/login">Войти</Button>
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <ModalsController />
    <AuthProvider>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">Главная</Navbar.Brand>
          <Nav className="mr-auto">
            {/* <Nav.Link as={Link} to="/public">Public page</Nav.Link> */}
            <Nav.Link as={Link} to="/chat">Чат</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/chat">
            <Chat />
          </PrivateRoute>
          <Route path="*" component={PageNotFound} />
        </Switch>

      </Router>
    </AuthProvider>
  </div>
);

export default App;
