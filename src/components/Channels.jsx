import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Nav, Col,
} from 'react-bootstrap';

import {
  setCurrentChannel,
} from '../slices/channels.js';

const Channels = () => {
  const channelsState = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleChangeChannel = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const renderChannels = () => channelsState.channels.map(({ id, name, removable }) => (
    <Nav.Item as="li" className="w-100" key={id}>
      {id === channelsState.currentChannelId ? (
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span># </span>
          {`${name}`}
        </button>
      ) : (
        <button type="button" className="w-100 rounded-0 text-start btn" onClick={handleChangeChannel(id)}>
          <span># </span>
          {`${name}`}
        </button>
      )}
    </Nav.Item>
  ));

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button variant="text-primary" type="button" className="p-0 text-primary btn btn-group-vertical">
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
