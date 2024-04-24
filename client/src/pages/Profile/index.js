import { Link, useNavigate } from "react-router-dom";
import { category } from "../../components/Flash";
import { useAuth } from "../../hooks/AuthProvider";
import { post, remove } from "../../services/axios";
import { useFlash } from "../../hooks/FlashProvider";
import { useLoading } from "../../hooks/LoadingProvider";
import { Helmet } from "react-helmet-async";
import Table from "../../components/Table";

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
            .catch(reason => console.error(reason.message))
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
            .catch(reason => console.error(reason.message))
            .finally(() => setLoading(null));
    };

    return (
        <>
            <Helmet>
                <title>
                    Profile {profile ? profile.username : ""} | Human Performance Tester
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
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        Username
                                    </th>
                                    <th>
                                        Role
                                    </th>
                                    <th>
                                        Born
                                    </th>
                                    <th>
                                        Member since
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {profile.username}
                                    </td>
                                    <td>
                                        <span className={`role ${profile.role}`}>{profile.role}</span>
                                    </td>
                                    <td>
                                        {profile.born}
                                    </td>
                                    <td>
                                        {new Date(profile.timestamp).toDateString()}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="button-container">
                            <Link to="/profile/update" className="button">
                                Update
                            </Link>
                            <button className="red" onClick={signOut}>
                                Sign out
                            </button>
                            <button className="red" onClick={removeProfile}>
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </section>
        </>
    )
}

export default Profile;