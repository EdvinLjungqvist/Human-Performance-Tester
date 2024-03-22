import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";

const SocketContext = createContext();

const useSocket = () => {
    return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
    const [loadingRoom, setLoadingRoom] = useState(true);
    const [room, setRoom] = useState(null);

    const value = {
        loadingRoom,
        socket,
        room
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export {
    useSocket,
    SocketProvider
};