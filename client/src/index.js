import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <Router>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </Router>
    </StrictMode>
);
