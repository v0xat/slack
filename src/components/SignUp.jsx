import React from 'react';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../assets/signUpCat.gif';
import SignUpForm from './forms/SignUpForm.jsx';

const SignUp = () => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src={logo} alt={t('global.signUp')} thumbnail />
              </div>
              <SignUpForm history={history} location={location} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
