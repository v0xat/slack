import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form, Button,
} from 'react-bootstrap';

import { useSocket } from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modals.js';

const RenameChannelForm = ({ channelId }) => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const { channels } = useSelector((state) => state.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);
  const channelsNames = channels.map(({ name }) => name);
  console.log(currentChannel);

  const schema = yup.object().shape({
    channelName: yup.string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Название должно быть уникальным'),
  });

  const handleFocus = (event) => event.target.select();

  const handleClose = () => dispatch(closeModal());

  return (
    <Formik
      validationSchema={schema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => {
        try {
          const channel = { id: channelId, name: values.channelName };
          console.log(channel);
          socket.renameChannel(channel);
          handleClose();
        } catch (e) {
          console.log(e);
        }
      }}
      initialValues={{
        channelName: currentChannel.name,
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
              onFocus={handleFocus}
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

export default RenameChannelForm;
