import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/AuthProvider";
import { useSocket } from "../../../../hooks/SocketProvider";
import { useFlash } from "../../../../hooks/FlashProvider";
import { category } from "../../../../components/Flash";
import "./style.css";

const RoomList = ({ rooms }) => {
    const { socket } = useSocket();
    const { profile } = useAuth();
    const { setFlash } = useFlash();

    const navigate = useNavigate();

    const joinRoom = (roomID) => {
        socket.emit("room:join", {
            roomID: roomID,
            profile: profile
        }, success => {
            if (success) {
                navigate(`/room/${roomID}`);
                setFlash({
                    message: "Successfully joined room!",
                    category: category.success
                });
            }
        });
    };

    return (
        <>
            {rooms && rooms.length > 0 ? (
                <div>
                    <ul className="room-list">
                        {rooms.map((room, index) => (
                            <li key={index} className="room-list-item">
                                <div className="room-list-content">
                                    <p className="room-list-text">
                                        <span className="room-list-id">{room.id}</span>
                                    </p>
                                    <p className="room-list-text">
                                        Playing: <span className="room-list-playing">{room.players.length}</span>
                                    </p>
                                </div>
                                <button className="green" onClick={() => joinRoom(room.id)}>
                                    Join
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <>
                    <p>
                        No rooms have been created yet!
                    </p>
                </>
            )}
        </>
    );

};

export default RoomList;
