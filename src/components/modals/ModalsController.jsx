import React from 'react';
import { useSelector } from 'react-redux';

import AddChannelModal from './AddChannelModal.jsx';

const modalComponentMap = {
  AddChannelModal,
};

const ModalManager = () => {
  const currentModal = useSelector((state) => state.modals);

  if (currentModal) {
    const { modalType } = currentModal;
    const ModalComponent = modalComponentMap[modalType];

    const renderedModal = <ModalComponent />;
    return <span>{renderedModal}</span>;
  }

  return <span />;
};

export default ModalManager;
