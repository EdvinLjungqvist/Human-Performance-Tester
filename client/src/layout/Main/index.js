import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import "./style.css";
import NotFound from "../../pages/NotFound";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route index element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
};

export default Main;
