import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import socketContext from './context/socket.jsx';
import '../assets/application.scss';
import App from './components/App.jsx';
import store from './app/store';
import { addMessage } from './slices/messages.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

socket.on('newMessage', (message) => store.dispatch(addMessage(message)));

socket.on('connect', () => {
  console.log(socket.id);
});

const SocketProvider = ({ children }) => {
  const sendMessage = (message) => {
    socket.emit('newMessage', message, () => {});
  };

  return (
    <socketContext.Provider value={{
      sendMessage,
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
