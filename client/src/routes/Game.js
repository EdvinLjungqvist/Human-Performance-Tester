import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider";
import { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useFlash } from "../hooks/FlashProvider";
import { category } from "../components/Flash";

const Game = () => {
    const { socket, loadingRoom, room } = useSocket();
    const { loadingProfile, profile } = useAuth();
    const { setFlash } = useFlash();
    const { id } = useParams();
    const loading = loadingRoom || loadingProfile;

    useEffect(() => {
        if (!loading && !room) {
            socket.emit("room:join", {
                roomID: id,
                profile: profile
            }, data => {
                setFlash({
                    message: data.message,
                    category: data.success ? category.success : category.error
                });
            });
        }
    }, [loadingRoom, loadingProfile]);

    if (loading) return null;
    if (!room) return <Navigate to="/rooms" />;
    if (room.id !== id) return <Navigate to={`/room/${room.id}`} />;
    return <Outlet />;
};

export default Game;