import { useAuth } from "../../../../hooks/AuthProvider";
import { useSocket } from "../../../../hooks/SocketProvider";
import "./style.css";

const PlayerList = () => {
    const { profile } = useAuth();
    const { room } = useSocket();

    return (
        <ul className="player-list">
            {room && room.players.map((player, index) => (
                <li key={index} className="player-list-item">
                    <p className="player-list-text">
                        <span className={`role ${player.profile.role}`}>{player.profile.role}</span> {player.profile.username} {profile && player.profile.id === profile.id ? "(You)" : ""}
                    </p>
                    <p className="text-highlight">
                        {player.score}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default PlayerList;