import { useContext } from 'react';

import authContext from '../context/auth.jsx';
import { SocketContext } from '../context/socket.jsx';

const useAuth = () => useContext(authContext);
const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
