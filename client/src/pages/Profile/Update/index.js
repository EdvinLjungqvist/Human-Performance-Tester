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
    const { profile, setProfile, setLoadingProfile } = useAuth();
    const { setLoading } = useLoading();
    const { setFlash } = useFlash();

    const navigate = useNavigate();

    const update = (e, info) => {
        e.preventDefault();

        const data = info == "username" ? { username } : info == "password" ? { password } : info == "born" ? { born } : null

        setLoading("Updating profile...");
        post(`/profile/update-${info}`, data)
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
            <Form onSubmit={(e) => update(e, "username")} method="post">
                <label>
                    Username
                    <input type="text" required minLength={3} maxLength={16} placeholder={profile && profile.username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <input type="submit" value="Update" />
            </Form>
            <Form onSubmit={(e) => update(e, "password")} method="post">
                <label>
                    Password
                    <input type="password" required minLength={6} maxLength={128} placeholder="..." onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Update" />
            </Form>
            <Form onSubmit={(e) => update(e, "born")} method="post">
                <label>
                    Born
                    <input type="number" min={1901} max={new Date().getFullYear()} placeholder={profile && profile.born} required onChange={(e) => setBorn(e.target.value)} />
                </label>
                <input type="submit" value="Update" />
            </Form>
        </section>
    );
};

export default Update;
