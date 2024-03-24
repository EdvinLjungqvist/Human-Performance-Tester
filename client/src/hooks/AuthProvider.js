import { createContext, useContext, useState, useEffect } from "react";
import { get } from "../services/axios";
import { useLoading } from "./LoadingProvider";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [auth, setAuth] = useState(false);
    const [profile, setProfile] = useState(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading("Authenticating...");
        get("/auth")
            .then(() => setAuth(true))
            .catch(() => setAuth(false))
            .finally(() => {
                setLoading(null);
                setLoadingAuth(false);
            });
    }, []);

    useEffect(() => {
        setLoadingProfile(true);

        if (auth) {
            setLoading("Loading profile...");
            get("/profile")
                .then(response => setProfile(response.data))
                .catch(() => setProfile(null))
                .finally(() => {
                    setLoading(null);
                    setLoadingProfile(false);
                });
        }
    }, [auth]);

    const value = {
        loadingAuth,
        auth,
        setAuth,
        loadingProfile,
        profile,
        setProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export {
    useAuth,
    AuthProvider
};
