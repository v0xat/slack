import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

import { useSocket } from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modals.js';

const ChannelForm = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { channels } = useSelector((state) => state.channels);
  const channelsNames = channels.map(({ name }) => name);

  const schema = yup.object().shape({
    channelName: yup.string()
      .trim()
      .required('Обязательное поле')
      .min(2, 'Слишком короткое!')
      .max(25, 'Слишком длинное!')
      .notOneOf(channelsNames, 'Название должно быть уникальным'),
  });

  const handleClose = () => dispatch(closeModal());

  return (
    <Formik
      validationSchema={schema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => {
        try {
          const channel = { name: values.channelName };
          socket.addNewChannel(channel);
          handleClose();
        } catch (e) {
          console.log(e);
        }
      }}
      initialValues={{
        channelName: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              autoFocus
              type="text"
              name="channelName"
              className="mb-2"
              value={values.channelName}
              onChange={handleChange}
              isInvalid={errors.channelName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.channelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" variant="secondary" onClick={handleClose}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChannelForm;
