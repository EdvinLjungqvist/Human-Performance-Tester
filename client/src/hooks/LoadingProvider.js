import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

const useLoading = () => {
    return useContext(LoadingContext);
};

const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(null);
    
    const value = {
        loading,
        setLoading
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export {
    useLoading,
    LoadingProvider
};