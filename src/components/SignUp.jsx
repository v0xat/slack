import React from 'react';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
// import { useLocation, useHistory } from 'react-router-dom';

import logo from '../assets/signUpCat.gif';
import SignUpForm from './forms/SignUpForm.jsx';

// eslint-disable-next-line arrow-body-style
const SignUp = () => {
  // const location = useLocation();
  // const history = useHistory();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={logo} alt="Регистрация" thumbnail />
              </div>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
