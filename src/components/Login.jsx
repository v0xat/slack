import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import logo from '../assets/loginCat.gif';
import LoginForm from './forms/LoginForm.jsx';

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={logo} alt={t('global.login')} thumbnail />
              </div>
              <LoginForm history={history} location={location} />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('global.newUser')}</span>
                <Link to="/signup">{t('global.signUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
