/* eslint-disable no-shadow */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import './utils/i18n';

import '../assets/application.scss';
import rollbarConfig from './utils/rollbarConfig.js';
import store from './app/store';
import App from './components/App.jsx';
import { socket, SocketContext } from './context/socket.jsx';
import UserContext from './context/user.jsx';
import { addMessage } from './slices/messages.js';
import { addChannel, renameChannel, removeChannel } from './slices/channels.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

socket.on('newMessage', (message) => store.dispatch(addMessage(message)));
socket.on('newChannel', (channel) => store.dispatch(addChannel(channel)));
socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));
socket.on('removeChannel', (channel) => store.dispatch(removeChannel(channel)));

const SocketProvider = ({ children }) => {
  const sendMessage = (message) => {
    socket.emit('newMessage', message, () => {});
  };

  const addNewChannel = (channel) => {
    socket.emit('newChannel', channel, () => {});
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, () => {});
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, () => {});
  };

  return (
    <SocketContext.Provider value={{
      sendMessage, addNewChannel, renameChannel, removeChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const UserProvider = ({ children }) => {
  const curUserData = JSON.parse(localStorage.getItem('userData'));
  const curUser = curUserData ? { username: curUserData.username } : null;
  const [userData, setUser] = useState(curUser);

  const logIn = ({ username, token }) => {
    localStorage.setItem('userData', JSON.stringify({ username, token }));
    setUser({ username });
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ userData, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

ReactDOM.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <SocketProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </SocketProvider>
      </ReduxProvider>
    </ErrorBoundary>
  </RollbarProvider>,
  document.querySelector('#chat'),
);
