import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "../../components/Form";
import { useSocket } from "../../hooks/SocketProvider";
import { useAuth } from "../../hooks/AuthProvider";

const Rooms = () => {
    const [roomID, setRoomID] = useState(null);
    const { socket } = useSocket();
    const { profile } = useAuth();

    const createRoom = (e) => {
        e.preventDefault();

        socket.emit("room:join", roomID, profile);
    };

    return (
        <>
            <Helmet>
                <title>
                    Rooms | Human Performance Tester
                </title>
            </Helmet>
            <section className="content-container">
                <div className="title-container">
                    <h1>
                        Rooms
                    </h1>
                    <p>
                        Create or join a room!
                    </p>
                </div>
                <Form onSubmit={createRoom} method="post">
                    <label>
                        Room
                        <input type="text" required minLength={3} maxLength={16} placeholder="..." onChange={(e) => setRoomID(e.target.value)} />
                    </label>
                    <input type="submit" value="Create" />
                </Form>
            </section>
        </>
    )
};

export default Rooms;
