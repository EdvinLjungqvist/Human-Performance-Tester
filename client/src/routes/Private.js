import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Private = () => {
    const { loadingAuth, auth } = useAuth();

    if (loadingAuth) return null;
    if (!auth) return <Navigate to="/signin" />;
    return <Outlet />
};

export default Private;