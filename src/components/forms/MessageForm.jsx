import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Form, Col, Row, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useSocket, useUser } from '../../hooks/index.jsx';
import validation from '../../validationSchemas';

const MessageForm = () => {
  const { t } = useTranslation();
  const { userData } = useUser();
  const socket = useSocket();
  const { currentChannelId } = useSelector((state) => state.channels);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        validationSchema={validation.messagesSchema(t)}
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
          isSubmitting,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder={t('enterMessage')}
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" className="mb-3" disabled={isSubmitting}>{t('buttons.send')}</Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
