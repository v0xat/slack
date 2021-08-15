import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../../slices/modals.js';
import RenameChannelForm from '../forms/RenameChannelForm.jsx';

const RenameChannelModal = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  return (
    <Modal show onHide={handleClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{t('channels.rename')}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm channelId={id} />
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
