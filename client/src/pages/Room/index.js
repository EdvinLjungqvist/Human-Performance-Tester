import { Helmet } from "react-helmet-async";
import { useSocket } from "../../hooks/SocketProvider";

const Room = () => {
    const { socket, room } = useSocket();

    const leave = () => {
        socket.emit("room:leave");
    };

    return (
        <>
            <Helmet>
                <title>
                    {room.id} | Human Performance Tester
                </title>
            </Helmet>
            <div className="button-container">
                <button className="red" onClick={leave}>
                    Leave
                </button>
            </div>
        </>
    );
};

export default Room;
