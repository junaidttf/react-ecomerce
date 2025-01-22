import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Footer, Navbar} from "../components";
import {useUser} from "../components/custom_contexts";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const {login} = useUser();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                // Store the user data in localStorage
                login(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/"); // Redirect to homepage or dashboard
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Login failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            <Navbar/>
            <div className="container my-3 py-3">
                <h1 className="text-center">Login</h1>
                <hr/>
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="my-3">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <div className="my-3">
                                <p>
                                    New here?{" "}
                                    <Link
                                        to="/register"
                                        className="text-decoration-underline text-info"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Login;
