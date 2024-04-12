import { Helmet } from "react-helmet-async";
import GalleryComponent from "./components/Gallery";

const Gallery = () => {
    return (
        <>
            <Helmet>
                <title>
                    Gallery | Human Performance Tester
                </title>
            </Helmet>
            <section className="content-container">
                <div className="title-container">
                    <h1>
                        Gallery
                    </h1>
                    <p>
                        Choose a game of your choice
                    </p>
                </div>
                <GalleryComponent />
            </section>
        </>
    );
};

export default Gallery;