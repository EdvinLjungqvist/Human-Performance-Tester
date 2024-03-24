import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider";

const Game = () => {
    const { loadingRoom, room } = useSocket();
    const { id } = useParams();

    if (loadingRoom) return null;
    if (!room) return <Navigate to="/rooms" />;
    if (room.id !== id) return <Navigate to={`/room/${room.id}`} />;
    return <Outlet />;
};

export default Game;