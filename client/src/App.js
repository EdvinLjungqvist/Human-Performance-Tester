import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";
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