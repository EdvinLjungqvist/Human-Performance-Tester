import { useSocket } from "../../../../hooks/SocketProvider";
import PlayerList from "../PlayerList";
import "./style.css";

const Room = () => {
    const { room } = useSocket();

    // Room
    //  L Lobby
    //  L Game
    //      start, next, end...

    return (
        <div className="content-container">
            <div className="room">
                
            </div>
            <div className="content-container">
                <h2>
                    Players ({room.players.length})
                </h2>
                <PlayerList />
            </div>
        </div>
    )
};

export default Room;
