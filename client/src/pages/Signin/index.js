import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import Form from "../../components/Form";
import { post } from "../../services/axios";
import { useLoading } from "../../hooks/LoadingProvider";
import { Helmet } from "react-helmet-async";
import { useFlash } from "../../hooks/FlashProvider";
import { category } from "../../components/Flash";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth } = useAuth();
    const { setLoading } = useLoading();
    const { setFlash } = useFlash();

    const signIn = (e) => {
        e.preventDefault();

        setLoading("Signing in...");
        post("/auth/signin", { username, password })
            .then(() => {
                setAuth(true);
                setFlash({
                    message: "Successfully signed in!",
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
                    Sign in | Human Performance Tester
                </title>
            </Helmet>
            <section className="content-container">
                <div className="title-container">
                    <h1>
                        Sign in
                    </h1>
                    <p>
                        Don't have a profile? <Link to="/signup">Sign up</Link>!
                    </p>
                </div>
                <Form onSubmit={signIn} method="post">
                    <label>
                        Username
                        <input type="text" required minLength={3} maxLength={16} placeholder="..." onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password
                        <input type="password" required minLength={6} maxLength={128} placeholder="..." onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <input type="submit" value="Sign in" />
                </Form>
            </section>
        </>
    )
};

export default Signin;