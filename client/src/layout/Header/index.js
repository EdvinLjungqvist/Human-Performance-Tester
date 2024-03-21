import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./style.css";

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenuActive = () => setMenuActive(!menuActive);

    return (
        <header className={menuActive ? "active" : ""}>
            <nav>
                <NavLink to="/" id="logo-container">
                    <img src={logo} alt="Logo" id="logo" />
                </NavLink>
                <ul id="nav-list" className={menuActive ? "active" : ""}>
                    <li className="nav-item">
                        <NavLink to="/gallery" className="nav-link" activeclassname="active" end onClick={toggleMenuActive}>
                            Gallery
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/statistics" className="nav-link" activeclassname="active" end onClick={toggleMenuActive}>
                            Statistics
                        </NavLink>
                    </li>
                    
                </ul>
                <button id="hamburger" onClick={toggleMenuActive}>
                    <i className="fa-solid fa-bars fa-xl" />
                </button>
            </nav>
        </header>
    )
};

export default Header;
