import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "../../components/Form";
import { useSocket } from "../../hooks/SocketProvider";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../../hooks/FlashProvider";
import { category } from "../../components/Flash";
import RoomList from "./components/RoomList";

const Rooms = () => {
    const [roomID, setRoomID] = useState(null);
    const [rooms, setRooms] = useState([]);
    const { socket } = useSocket();
    const { profile } = useAuth();
    const { setFlash } = useFlash();

    const navigate = useNavigate();

    useEffect(() => {
        const onGetAllRooms = rooms => setRooms(rooms);

        socket.emit("room:get-all", onGetAllRooms);
        socket.on("room:get-all", onGetAllRooms);

        return () => {
            socket.off("room:get-all", onGetAllRooms);
        };
    }, []);

    const joinRoom = (e) => {
        e.preventDefault();

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
                <Form onSubmit={joinRoom} method="post">
                    <label>
                        Room
                        <input type="text" required minLength={3} maxLength={16} placeholder="..." onChange={(e) => setRoomID(e.target.value)} />
                    </label>
                    <input type="submit" value="Create / Join" />
                </Form>
                <h2>
                    Active rooms ({rooms.length})
                </h2>
                <RoomList rooms={rooms} />
            </section>
        </>
    )
};

export default Rooms;
