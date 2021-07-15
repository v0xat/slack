import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form, Col, Row, Button,
} from 'react-bootstrap';

import { useSocket } from '../hooks/index.jsx';

const schema = yup.object().shape({
  message: yup.string().trim().required(),
});

const MessageForm = () => {
  const socket = useSocket();
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  console.log('MessageForm.jsx', messages, currentChannelId, socket);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          try {
            const msg = { username: 'admin', text: values.message, channelId: currentChannelId };
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
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormik01">
                <Form.Control
                  type="text"
                  placeholder="Введите сообщение..."
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message}
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
