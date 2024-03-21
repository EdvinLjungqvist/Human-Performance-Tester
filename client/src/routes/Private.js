import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Private = () => {
    const { auth, loadingAuth } = useAuth();

    return !loadingAuth && auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default Private;