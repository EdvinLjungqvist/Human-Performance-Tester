import { Link } from "react-router-dom";
import image from "../../../../assets/images/image.png";
import "./style.css";

const Gallery = () => {
    return (
        <article className="gallery-container">
            <Link to="/gallery/verbal-memory" className="gallery-link">
                <div className="gallery-cell">
                    <img src={image} alt="image" />
                    <div className="gallery-content">
                        <h3 className="gallery-title">
                            Verbal memory
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </Link>
            <Link to="/gallery/reaction-time" className="gallery-link">
                <div className="gallery-cell">
                    <img src={image} alt="image" />
                    <div className="gallery-content">
                        <h3 className="gallery-title">
                            Reaction time
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </Link>
            <Link to="/gallery/reaction-time" className="gallery-link">
                <div className="gallery-cell">
                    <img src={image} alt="image" />
                    <div className="gallery-content">
                        <h3 className="gallery-title">
                            Reaction time
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </Link>
            <Link to="/gallery/reaction-time" className="gallery-link">
                <div className="gallery-cell">
                    <img src={image} alt="image" />
                    <div className="gallery-content">
                        <h3 className="gallery-title">
                            Reaction time
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </Link>
            <Link to="/gallery/reaction-time" className="gallery-link">
                <div className="gallery-cell">
                    <img src={image} alt="image" />
                    <div className="gallery-content">
                        <h3 className="gallery-title">
                            Reaction time
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </Link>
            <Link to="/gallery/reaction-time" className="gallery-link">
                <div className="gallery-cell">
                    <img src={image} alt="image" />
                    <div className="gallery-content">
                        <h3 className="gallery-title">
                            Reaction time
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </Link>
        </article >
    );
};

export default Gallery;