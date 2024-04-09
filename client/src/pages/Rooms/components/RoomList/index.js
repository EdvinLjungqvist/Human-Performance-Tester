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
        }, data => {
            if (data.success) {
                navigate(`/room/${roomID}`);
                setFlash({
                    message: data.message,
                    category: category.success
                });
            } else {
                setFlash({
                    message: data.message,
                    category: category.error
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
                        There are no active rooms!
                    </p>
                </>
            )}
        </>
    );

};

export default RoomList;
