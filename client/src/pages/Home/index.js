import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Statistics from "../../components/Statistics";
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
                <section className="content-container">
                    <div className="title-container">
                        <h2>
                            Statistics
                        </h2>
                        <p>
                            This website saves a lot of statistics
                        </p>
                    </div>
                    <Statistics />
                    <div className="button-container">
                        <Link to="/statistics" className="button">
                            Read more
                        </Link>
                    </div>
                </section>
            </article>
        </>
    )
};

export default Home;