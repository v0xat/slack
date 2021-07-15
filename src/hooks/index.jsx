// @ts-check

import { useContext } from 'react';

import authContext from '../context/auth.jsx';
import socketContext from '../context/socket.jsx';

const useAuth = () => useContext(authContext);
const useSocket = () => useContext(socketContext);

export { useAuth, useSocket };
