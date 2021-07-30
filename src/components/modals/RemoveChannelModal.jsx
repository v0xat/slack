import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useSocket } from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modals.js';

const RemoveChannelModal = ({ id }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const handleRemoveChannel = () => {
    try {
      socket.removeChannel({ id });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>Удалить канал</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" variant="secondary" onClick={handleClose}>Отменить</Button>
          <Button variant="danger" onClick={handleRemoveChannel}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
