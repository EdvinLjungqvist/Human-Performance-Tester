import { io } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const socket = io.connect(API_URL);

export default socket;
