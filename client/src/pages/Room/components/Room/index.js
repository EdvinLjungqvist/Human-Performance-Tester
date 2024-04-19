import Menu from "../Menu";
import VerbalMemory from "../../../../games/VerbalMemory";
import { useEffect, useState } from "react";
import { useSocket } from "../../../../hooks/SocketProvider";
import "./style.css";
import { useFlash } from "../../../../hooks/FlashProvider";
import { category } from "../../../../components/Flash";

const Room = () => {
    const [game, setGame] = useState(null);
    const { socket, room } = useSocket();
    const { setFlash } = useFlash();

    useEffect(() => {
        const onGetGame = game => {
            setGame(game);
        };
        const onEndGame = winner => {
            setGame(null);
            if (winner) {
                setFlash({
                    message: `${winner.profile.username} has won!`,
                    category: category.info
                });
            } else {
                setFlash({
                    message: "The game has ended!",
                    category: category.info
                });
            }
        };

        socket.on("game:get", onGetGame);
        socket.on("game:end", onEndGame);

        return () => {
            socket.off("game:get", onGetGame);
            socket.off("game:end", onEndGame);
        };
    }, []);

    const end = () => {
        socket.emit("game:end");
    };

    return (
        <div className="room">
            {game == null ? (
                <Menu />
            ) : (
                <>
                    {game == "verbal-memory" && <VerbalMemory multiplayer />}
                    {room.hostID === socket.id && (
                        <div className="button-container">
                            <button className="red" onClick={end}>
                                End
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Room;
