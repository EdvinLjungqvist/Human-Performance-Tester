import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import Loader from "./components/Loader";
import Flash from "./components/Flash";
import "./App.css";

const App = () => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
            <Loader />
            <Flash />
        </>
    )
};

export default App;