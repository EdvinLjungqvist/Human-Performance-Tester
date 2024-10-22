import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SocketProvider } from "./hooks/SocketProvider";
import { LoadingProvider } from "./hooks/LoadingProvider";
import { FlashProvider } from "./hooks/FlashProvider";
import { AuthProvider } from "./hooks/AuthProvider";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <Router>
            <HelmetProvider>
                <LoadingProvider>
                    <FlashProvider>
                        <AuthProvider>
                            <SocketProvider>
                                <App />
                            </SocketProvider>
                        </AuthProvider>
                    </FlashProvider>
                </LoadingProvider>
            </HelmetProvider>
        </Router>
    </StrictMode>
);
