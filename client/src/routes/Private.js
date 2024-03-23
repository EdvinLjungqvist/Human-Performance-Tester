import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Private = () => {
    const { loadingAuth, auth } = useAuth();

    return !loadingAuth ? auth ? <Outlet /> : <Navigate to="/signin" /> : null;
};

export default Private;