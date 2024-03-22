import { Route, Routes } from "react-router-dom";
import Private from "../../routes/Private";
import Public from "../../routes/Public";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Signup from "../../pages/Signup";
import Signin from "../../pages/Signin";
import NotFound from "../../pages/NotFound";
import "./style.css";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route index element={<Home />} />
                <Route element={<Private />}>
                    <Route path="/profile" element={<Profile />} />
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
