import { Navigate, Outlet } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider";

const Lobby = () => {
    const { loadingRoom, room } = useSocket();
    
    if (loadingRoom) return null;
    if (room) return <Navigate to={`/room/${room.id}`} />;
    return <Outlet />;
};

export default Lobby;