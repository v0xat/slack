import React from 'react';
import { useSelector } from 'react-redux';

import AddChannelModal from './AddChannelModal.jsx';

const modalComponentMap = {
  AddChannelModal,
};

const ModalManager = () => {
  const currentModal = useSelector((state) => state.modals);

  if (currentModal) {
    const { name, props = null } = currentModal;
    const ModalComponent = modalComponentMap[name];

    // eslint-disable-next-line react/jsx-props-no-spreading
    const renderedModal = <ModalComponent {...props} />;
    return <span>{renderedModal}</span>;
  }

  return <span />;
};

export default ModalManager;
