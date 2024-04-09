import { useRef } from "react";
import Form from "../../../../components/Form";
import { useSocket } from "../../../../hooks/SocketProvider";
import "./style.css";

const Menu = () => {
    const game = useRef();
    const { socket } = useSocket();

    const start = e => {
        e.preventDefault();

        socket.emit("game:start", game.current.value, success => {
            if (success) {
                
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
                <Form onSubmit={start}>
                    <label>
                        Select a game
                        <select ref={game} name="game-types">
                            <option value="verbal-memory">Verbal memory</option>
                            <option value="reaction-time">Reaction time</option>
                        </select>
                    </label>
                    <input type="submit" value="Start" />
                </Form>
            </div>
        </div>
    );
};

export default Menu;
