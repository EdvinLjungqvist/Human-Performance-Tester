import { useEffect, useRef } from "react";
import Form from "../../../../components/Form";
import { useSocket } from "../../../../hooks/SocketProvider";
import { useFlash } from "../../../../hooks/FlashProvider";
import { category } from "../../../../components/Flash";
import "./style.css";

const Menu = () => {
    const gameSelector = useRef();
    const { socket, room } = useSocket();
    const { setFlash } = useFlash();

    useEffect(() => {
        const onStartGame = ({ success, message }) => {
            setFlash({
                message: message,
                category: success ? category.info : category.error
            });
        };

        socket.on("game:start", onStartGame);

        return () => {
            socket.off("game:start", onStartGame);
        };
    }, []);

    const start = e => {
        e.preventDefault();

        socket.emit("game:start", gameSelector.current.value, ({ success, message }) => {
            if (!success) {
                setFlash({
                    message: message,
                    category: category.error
                });
            }
        });
    };

    return (
        <div className="menu">
            <div className="menu-inner">
                <div className="title-container">
                    <h2>
                        Main menu
                    </h2>
                </div>
                {room.hostID === socket.id ? (
                    <Form onSubmit={start}>
                        <label>
                            Select a game
                            <select ref={gameSelector} name="game-types">
                                <option value="verbal-memory">Verbal memory</option>
                                <option value="reaction-time">Reaction time</option>
                            </select>
                        </label>
                        <input type="submit" value="Start" />
                    </Form>
                ) : (
                    <p className="text-center">
                        Waiting for host to start...
                    </p>
                )}
            </div>
        </div>
    );
};

export default Menu;
