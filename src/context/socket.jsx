import { createContext } from 'react';
import { io } from 'socket.io-client';

const socket = io();
const SocketContext = createContext();

export { socket, SocketContext };
