import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import image from "../../assets/images/image.png";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>
                    Human Performance Tester
                </title>
            </Helmet>
            <article className="content-container">
                <div className="title-container">
                    <h1>
                        Human Performance Tester
                    </h1>
                    <p>
                        Challenge yourself in various tests that measure performance!
                    </p>
                    <div className="button-container">
                        <Link to="/gallery" className="button">
                            <i className="fa-solid fa-arrow-up-right-from-square" /> Gallery
                        </Link>
                    </div>
                </div>
                <img src={image} alt="image" />
            </article>
        </>
    )
};

export default Home;