import { useContext } from 'react';

import UserContext from '../context/user.jsx';
import { SocketContext } from '../context/socket.jsx';

const useUser = () => useContext(UserContext);
const useSocket = () => useContext(SocketContext);

export { useUser, useSocket };
