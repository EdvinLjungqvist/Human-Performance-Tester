import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Public = () => {
    const { loadingAuth, auth } = useAuth();

    if (loadingAuth) return null;
    if (auth) return <Navigate to="/profile" />;
    return <Outlet />
};

export default Public;