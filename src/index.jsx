/* eslint-disable no-shadow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import socketContext from './context/socket.jsx';
import '../assets/application.scss';
import App from './components/App.jsx';
import store from './app/store';
import { addMessage } from './slices/messages.js';
import { addChannel, renameChannel, removeChannel } from './slices/channels.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

socket.on('newMessage', (message) => store.dispatch(addMessage(message)));
socket.on('newChannel', (channel) => store.dispatch(addChannel(channel)));
socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));
socket.on('removeChannel', (channel) => store.dispatch(removeChannel(channel)));

const SocketProvider = ({ children }) => {
  const sendMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      console.log(response.status);
    });
  };

  const addNewChannel = (channel) => {
    socket.emit('newChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  return (
    <socketContext.Provider value={{
      sendMessage, addNewChannel, renameChannel, removeChannel,
    }}
    >
      {children}
    </socketContext.Provider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>,
  document.querySelector('#chat'),
);
