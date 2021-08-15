import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Row, Spinner,
} from 'react-bootstrap';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import routes from '../utils/routes.js';
import { initState } from '../slices/channels.js';

const getAuthHeader = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
  if (userData.token) {
    return { Authorization: `Bearer ${userData.token}` };
  }

  return {};
};

const Chat = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServerState = () => {
      axios.get(routes.statePath(), { headers: getAuthHeader() })
        .then((res) => {
          dispatch(initState(res.data));
          setIsLoading(false);
        });
    };

    fetchServerState();
  }, []);

  return (
    isLoading ? <Spinner animation="grow" variant="primary" /> : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    )
  );
};

export default Chat;
