import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Nav, Col, Dropdown, ButtonGroup, Button,
} from 'react-bootstrap';

import { setCurrentChannel } from '../slices/channels.js';
import { openModal } from '../slices/modals.js';

const Channels = () => {
  const channelsState = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleChangeChannel = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const handleOpenModal = (name, id = null) => () => {
    dispatch(openModal({ name, props: { id } }));
  };

  const renderChannels = () => channelsState.channels.map(({ id, name, removable }) => (
    <Nav.Item as="li" key={id} className="w-100">
      {removable ? (
        <Dropdown as={ButtonGroup} className="w-100">
          <Button
            variant={`${id === channelsState.currentChannelId ? 'secondary' : 'light'}`}
            className="w-100 rounded-0 text-left"
            onClick={handleChangeChannel(id)}
          >
            <span># </span>
            {`${name}`}
          </Button>

          <Dropdown.Toggle
            split
            variant={`${id === channelsState.currentChannelId ? 'secondary' : 'light'}`}
            id="dropdown-split-basic"
          />

          <Dropdown.Menu>
            <Dropdown.Item href="" onClick={handleOpenModal('RenameChannelModal', id)}>Переименовать</Dropdown.Item>
            <Dropdown.Item href="" onClick={handleOpenModal('DeleteChannelModal', id)}>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={`${id === channelsState.currentChannelId ? 'secondary' : 'light'}`}
          className="w-100 rounded-0 text-left"
          onClick={handleChangeChannel(id)}
        >
          <span># </span>
          {`${name}`}
        </Button>
      )}
    </Nav.Item>
  ));

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button onClick={handleOpenModal('AddChannelModal')} variant="text-primary" type="button" className="p-0 text-primary btn btn-group-vertical">
          +
        </button>
      </Container>
      <Nav fill variant="pills" defaultActiveKey="/general" as="ul" className="flex-column px-2">
        {renderChannels()}
      </Nav>
    </Col>
  );
};

export default Channels;
