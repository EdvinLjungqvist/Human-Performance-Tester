import BarLoader from "react-spinners/BarLoader";
import { useLoading } from "../../hooks/LoadingProvider";
import "./style.css";

const Loader = () => {
    const { loading } = useLoading();

    return (
        loading && (
            <div className="loader-background">
                <div className="loader-container">
                    <BarLoader width={150} height={5} color="var(--color-purple-0)" />
                    <h4 className="loader-text">
                        {loading}
                    </h4>
                </div>
            </div>
        )
    );
}

export default Loader;
