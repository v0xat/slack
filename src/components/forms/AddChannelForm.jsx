import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import {
  Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.jsx';
import validation from '../../validationSchemas';
import { closeModal } from '../../slices/modals.js';

const AddChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const { channels } = useSelector((state) => state.channels);

  const handleClose = () => dispatch(closeModal());

  return (
    <Formik
      validationSchema={validation.channelsSchema(t, channels)}
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
            <Button className="mr-2" variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
            <Button type="submit" variant="primary">{t('buttons.send')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelForm;
