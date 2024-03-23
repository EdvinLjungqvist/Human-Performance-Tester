import { createContext, useContext, useState } from "react";

const FlashContext = createContext();

const useFlash = () => {
    return useContext(FlashContext);
};

const FlashProvider = ({ children }) => {
    const [flash, setFlash] = useState(null);

    const value = {
        flash,
        setFlash
    };

    return (
        <FlashContext.Provider value={value}>
            {children}
        </FlashContext.Provider>
    );
};

export {
    useFlash,
    FlashProvider
};
