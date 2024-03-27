import { Helmet } from "react-helmet-async";
import { useSocket } from "../../hooks/SocketProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFlash } from "../../hooks/FlashProvider";
import { category } from "../../components/Flash";
import RoomComponent from "./components/Room";
import PlayerList from "./components/PlayerList";

const Room = () => {
    const { socket, room, setRoom } = useSocket();
    const { setFlash } = useFlash();

    const navigate = useNavigate();

    useEffect(() => {
        const onLeaveHost = () => {
            setRoom(null);
            navigate("/rooms");
            setFlash({
                message: "You left the room because the host left!",
                category: category.info
            });
        };

        socket.on("room:leave-host", onLeaveHost);

        return () => {
            socket.off("room:leave-host", onLeaveHost);
        };
    }, []);

    const leave = () => {
        socket.emit("room:leave", success => {
            if (success) {
                setRoom(null);
                navigate("/rooms");
                setFlash({
                    message: "Successfully left room!",
                    category: category.success
                });
            }
        });
    };

    const copyURL = () => {
        const URL = document.location.href;

        navigator.clipboard.writeText(URL);
        setFlash({
            message: `Copied room URL to clipboard!`,
            category: category.success
        });
    };

    return (
        <>
            <Helmet>
                <title>
                    {room.id} | Human Performance Tester
                </title>
            </Helmet>
            <div className="content-container">
                <RoomComponent />
                <div className="button-container">
                    <button onClick={copyURL}>
                        <i class="fa-solid fa-copy" /> Copy URL
                    </button>
                    <button className="red" onClick={leave}>
                        Leave
                    </button>
                </div>
                <h2>
                    Players ({room.players.length})
                </h2>
                <PlayerList />
            </div>
        </>
    );
};

export default Room;
