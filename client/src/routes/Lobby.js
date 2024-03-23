import { Navigate, Outlet } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider";

const Lobby = () => {
    const { loadingRoom, room } = useSocket();

    return !loadingRoom ? room ? <Navigate to={`/room/${room.id}`} /> : <Outlet /> : null;
};

export default Lobby;