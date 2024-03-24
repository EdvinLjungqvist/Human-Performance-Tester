import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import { Helmet } from "react-helmet-async";
import { post } from "../../services/axios";
import { useLoading } from "../../hooks/LoadingProvider";
import { useFlash } from "../../hooks/FlashProvider";
import { category } from "../../components/Flash";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [born, setBorn] = useState(null);
    const { setLoading } = useLoading();
    const { setFlash } = useFlash();

    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();

        setLoading("Signing up...")
        post("/auth/signup", { username, password, born })
            .then(() => {
                navigate("/signin");
                setFlash({
                    message: "Successfully signed up!",
                    category: category.success
                });
            })
            .catch(reason => setFlash({
                message: reason.response.data.message,
                category: category.error
            }))
            .finally(() => setLoading(null));
    };

    return (
        <>
            <Helmet>
                <title>
                    Sign up | Human Performance Tester
                </title>
            </Helmet>
            <section className="content-container">
                <div className="title-container">
                    <h1>
                        Sign up
                    </h1>
                    <p>
                        Already have a profile? <Link to="/signin">Sign in</Link>!
                    </p>
                </div>
                <Form onSubmit={signUp} method="post">
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
                        <input type="number" min="1900" max="2024" placeholder="YYYY" required onChange={(e) => setBorn(e.target.value)} />
                    </label>
                    <label className="checkbox-container">
                        <input type="checkbox" required />
                        I accept the terms and conditions.
                    </label>
                    <input type="submit" value="Sign in" />
                </Form>
            </section>
        </>
    )
};

export default Signup;