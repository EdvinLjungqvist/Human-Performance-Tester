import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider";

const Game = () => {
    const { loadingRoom, room } = useSocket();
    const { id } = useParams();

    return !loadingRoom ? room ? room.id === id ? <Outlet /> : <Navigate to={`/room/${room.id}`} /> : <Navigate to="/rooms" /> : null;
};

export default Game;