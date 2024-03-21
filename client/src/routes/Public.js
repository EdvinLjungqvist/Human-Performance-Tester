import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Public = () => {
    const { auth, loadingAuth } = useAuth();

    return !loadingAuth && auth ? <Navigate to="/profile" /> : <Outlet />;
};

export default Public;