import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import logo from "../../assets/images/logo.png";
import profilePicture from "../../assets/images/profile-picture.png";
import { useSocket } from "../../hooks/SocketProvider";
import "./style.css";

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);
    const { auth, profile } = useAuth();
    const { room } = useSocket();

    const toggleMenuActive = () => setMenuActive(!menuActive);

    return (
        <header className={menuActive ? "active" : ""}>
            <nav>
                <NavLink to="/" id="logo-container" onClick={toggleMenuActive}>
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
                    {auth && profile ? (
                        <>
                            {room ? (
                                <li className="nav-item">
                                    <NavLink to={`/room/${room.id}`} className="nav-link" activeclassname="active" end onClick={toggleMenuActive}>
                                        Room
                                    </NavLink>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <NavLink to="/rooms" className="nav-link" activeclassname="active" end onClick={toggleMenuActive}>
                                        Rooms
                                    </NavLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <NavLink to="/profile" className="nav-link profile" activeclassname="active" end onClick={toggleMenuActive}>
                                    <img src={profilePicture} alt="profile" className="profile-picture" />
                                    <span className="profile-name">
                                        {profile.username}
                                    </span>
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <NavLink to="/signin" className="nav-link signin" activeclassname="active" end onClick={toggleMenuActive}>
                                Signin
                            </NavLink>
                        </li>
                    )}
                </ul>
                <button id="hamburger" onClick={toggleMenuActive}>
                    <i className="fa-solid fa-bars fa-xl" />
                </button>
            </nav>
        </header>
    );
};

export default Header;
