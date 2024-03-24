import { useAuth } from "../../../../hooks/AuthProvider";
import { useSocket } from "../../../../hooks/SocketProvider";
import "./style.css";

const PlayerList = () => {
    const { profile } = useAuth();
    const { room } = useSocket();

    return (
        <ul className="player-list">
            {room && room.players.map((client, index) => (
                <li key={index} className="player-list-item">
                    <p className="player-list-text">
                        <span className={`role ${client.profile.role}`}>{client.profile.role}</span> {client.profile.username} {profile && client.profile.id === profile.id ? "(You)" : ""}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default PlayerList;