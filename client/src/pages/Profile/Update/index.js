import { useState } from "react";
import { category } from "../../../components/Flash";
import { useFlash } from "../../../hooks/FlashProvider";
import { useLoading } from "../../../hooks/LoadingProvider";
import { get, post } from "../../../services/axios";
import Form from "../../../components/Form";
import { useAuth } from "../../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const Update = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [born, setBorn] = useState(null);
    const { setProfile, setLoadingProfile } = useAuth();
    const { setLoading } = useLoading();
    const { setFlash } = useFlash();

    const navigate = useNavigate();

    const update = (e) => {
        e.preventDefault();

        setLoading("Updating profile...")
        post("/profile/update", { username, password, born })
            .then(() => {
                get("/profile")
                    .then(response => setProfile(response.data))
                    .catch(() => setProfile(null))
                    .finally(() => {
                        setLoadingProfile(false);
                    });
                navigate("/profile");
                setFlash({
                    message: "Successfully updated profile!",
                    category: category.success
                });
            })
            .catch(reason => {
                if (reason.response) {
                    setFlash({
                        message: reason.response.data.message,
                        category: category.error
                    });
                } else {
                    console.error(reason.message);
                }
            })
            .finally(() => setLoading(null));
    };

    return (
        <section className="content-container">
            <div className="title-container">
                <h1>
                    Update profile
                </h1>
                <p>
                    Update profile information
                </p>
            </div>
            <Form onSubmit={update} method="post">
                <label>
                    Username
                    <input type="text" required minLength={3} maxLength={16} placeholder="..." onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password
                    <input type="password" required minLength={6} maxLength={128} placeholder="..." onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Born
                    <input type="number" min={new Date().getFullYear() - 200} max={new Date().getFullYear()} placeholder="YYYY" required onChange={(e) => setBorn(e.target.value)} />
                </label>
                <input type="submit" value="Update" />
            </Form>
        </section>
    );
};

export default Update;
