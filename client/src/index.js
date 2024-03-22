import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
                <SocketProvider>
                    <LoadingProvider>
                        <FlashProvider>
                            <AuthProvider>
                                <App />
                            </AuthProvider>
                        </FlashProvider>
                    </LoadingProvider>
                </SocketProvider>
            </HelmetProvider>
        </Router>
    </StrictMode>
);
