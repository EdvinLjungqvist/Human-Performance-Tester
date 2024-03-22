import { useNavigate } from "react-router-dom";
import { category } from "../../components/Flash";
import { useAuth } from "../../hooks/AuthProvider";
import { post, remove } from "../../services/axios";
import { useFlash } from "../../hooks/FlashProvider";
import { useLoading } from "../../hooks/LoadingProvider";
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const { setAuth, profile } = useAuth();
    const { setFlash } = useFlash();
    const { setLoading } = useLoading();

    const navigate = useNavigate();

    const signOut = () => {
        setLoading("Signing out...")
        post("/auth/signout")
            .then(() => {
                setAuth(false);
                navigate("/");
                setFlash({
                    message: "Successfully signed out!",
                    category: category.success
                });
            })
            .finally(() => setLoading(null));
    };

    const removeProfile = () => {
        setLoading("Removing profile...");
        remove("/profile")
            .then(() => {
                setAuth(false);
                navigate("/");
                setFlash({
                    message: "Successfully removed profile!",
                    category: category.success
                });
            })
            .finally(() => setLoading(null));
    };

    return (
        <>
            <Helmet>
                <title>
                    {profile ? profile.username : "Profile"} | Human Performance Tester
                </title>
            </Helmet>
            <section className="content-container">
                <div className="title-container">
                    <h1>
                        Profile
                    </h1>
                    <p>
                        Change settings, update credentials or why not add friends?
                    </p>
                </div>
                {profile && (
                    <>
                        <ul>
                            <li>
                                Username: <span className="text-highlight">{profile.username}</span>
                            </li>
                            <li>
                                Role: <span className={`role ${profile.role}`}>{profile.role}</span>
                            </li>
                            <li>
                                Born: <span className="text-highlight">{profile.born}</span>
                            </li>
                            <li>
                                Member since: <span className="text-highlight">{new Date(profile.timestamp).toDateString()}</span>
                            </li>
                        </ul>
                        <div className="button-container">
                            <button className="red" onClick={signOut}>
                                Sign out
                            </button>
                            <button className="red" onClick={removeProfile}>
                                Remove
                            </button>
                        </div>
                    </>
                )}
            </section>
        </>
    )
}

export default Profile;