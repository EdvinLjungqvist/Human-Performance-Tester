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
        const onGetRoom = room => {
            setRoom(room);
            setLoadingRoom(false);
            console.log(room)
        };
        socket.emit("room:get", onGetRoom);
        socket.on("room:get", onGetRoom);

        return () => {
            socket.off("room:get", onGetRoom);
        };
    }, []);

    const value = {
        socket,
        loadingRoom,
        setLoadingRoom,
        room,
        setRoom
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
