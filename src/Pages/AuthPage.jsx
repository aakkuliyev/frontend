import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../Pages/CSS/LoginSignUp.css";
import iitu from "../Components/Assets/iitu.png";

function AuthPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:8089/api/v1/auth/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Authentication failed.");

            const { token } = data;
            localStorage.setItem("token", token);

            const jwtPayload = JSON.parse(atob(token.split(".")[1]));
            const role = jwtPayload.role;

            if (role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (role === "TEACHER") {
                navigate("/teacher");
            } else {
                navigate("/");
            }
        } catch (err) {
            setMessage("❌ " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <img src={iitu} alt="IITU" className="auth-logo" />
                <p className="auth-subtext">Sign in to manage the system</p>

                <div className="input-icon">
                    <FaEnvelope />
                    <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-icon">
                    <FaLock />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className="auth-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Please wait…" : "Login"}
                </button>

                {message && <p className="auth-message">{message}</p>}
            </div>
        </div>
    );
}

export default AuthPage;
