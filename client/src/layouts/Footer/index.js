import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p className="footer-text">
                    © Human Performance Tester {new Date().getFullYear()}
                </p>
                <Link to="https://github.com/EdvinLjungqvist" target="_blank" className="footer-link">
                    <i className="fa-brands fa-github" /> EdvinLjungqvist
                </Link>
            </div>
        </footer>
    );
};

export default Footer;