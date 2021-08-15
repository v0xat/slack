import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modals.js';

const RemoveChannelModal = ({ id }) => {
  const { t } = useTranslation();
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
          <strong>{t('channels.remove')}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('global.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={handleRemoveChannel}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
