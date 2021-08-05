import React from 'react';
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
import Chat from './Chat.jsx';
import Home from './Home.jsx';
import PageNotFound from './PageNotFound.jsx';
import ModalsController from './modals/ModalsController.jsx';
import { useUser } from '../hooks/index.jsx';

const PrivateRoute = ({ children, path }) => {
  const user = useUser();
  return (
    <Route
      path={path}
      render={({ location }) => (user.userData ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const AuthButton = () => {
  const user = useUser();
  return user.userData ? <Button onClick={user.logOut}>Выйти</Button> : <Button as={Link} to="/login">Войти</Button>;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <ModalsController />
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
  </div>
);

export default App;
