import { createContext, useState, useContext, useEffect } from "react";
import socket from "../services/socket";

const SocketContext = createContext();

const useSocket = () => {
    return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
    const [loadingRoom, setLoadingRoom] = useState(true);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        socket.emit("room:get", room => {
            setRoom(room);
            setLoadingRoom(false);
        });
    }, []);

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
