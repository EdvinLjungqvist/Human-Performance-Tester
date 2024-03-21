import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>
                    404 Error | Human Performance Tester
                </title>
            </Helmet>
            <section className="title-container">
                <h1>
                    404 - Page not found!
                </h1>
                <p>
                    This is not the page you are looking for...
                </p>
                <div className="button-container">
                    <Link to="/" className="button">
                        Home
                    </Link>
                </div>
            </section>
        </>
    );
}

export default NotFound;