import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modals.js';
import AddChannelForm from '../forms/AddChannelForm.jsx';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>Добавить канал</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
