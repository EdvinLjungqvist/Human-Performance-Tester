import { Route, Routes } from "react-router-dom";
import Private from "../../routes/Private";
import Public from "../../routes/Public";
import Lobby from "../../routes/Lobby";
import Game from "../../routes/Game";
import Home from "../../pages/Home";
import Gallery from "../../pages/Gallery";
import Profile from "../../pages/Profile";
import Rooms from "../../pages/Rooms";
import Room from "../../pages/Room";
import Signup from "../../pages/Signup";
import Signin from "../../pages/Signin";
import NotFound from "../../pages/NotFound";
import "./style.css";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route element={<Private />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route element={<Lobby />}>
                        <Route path="/rooms" element={<Rooms />} />
                    </Route>
                    <Route element={<Game />}>
                        <Route path="/room/:id" element={<Room />} />
                    </Route>
                </Route>
                <Route element={<Public />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
};

export default Main;
