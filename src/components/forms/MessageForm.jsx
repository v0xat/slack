import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form, Col, Row, Button,
} from 'react-bootstrap';

import { useSocket, useUser } from '../../hooks/index.jsx';

const schema = yup.object().shape({
  message: yup.string()
    .trim()
    .required()
    .max(256, 'Слишком длинное сообщение...'),
});

const MessageForm = () => {
  const { userData } = useUser();
  const socket = useSocket();
  const { currentChannelId } = useSelector((state) => state.channels);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          try {
            const msg = {
              username: userData.username, text: values.message, channelId: currentChannelId,
            };
            socket.sendMessage(msg);
            actions.resetForm();
          } catch (e) {
            console.log(e);
          }
        }}
        initialValues={{
          message: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Введите сообщение..."
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" className="mb-3">Отправить</Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
