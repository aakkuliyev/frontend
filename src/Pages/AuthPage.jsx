import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import "./CSS/LoginSignUp.css";
import iitu from "../Components/Assets/iitu.png";

function AuthPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setIsRegistering(false);
        setMessage("");
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        const endpoint = isRegistering
            ? "http://localhost:8088/api/v1/auth/register"
            : "http://localhost:8088/api/v1/auth/authenticate";

        const payload = isRegistering
            ? {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            }
            : {
                email: formData.email,
                password: formData.password
            };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong.");

            localStorage.setItem("token", data.token);

            if (role === "Admin") navigate("/admin");
            else if (role === "Teacher") navigate("/teacher");
            else navigate("/dashboard");

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

                {!role ? (
                    <>
                        <h2 className="auth-title">Choose Role</h2>
                        <div className="role-select">
                            <button onClick={() => handleRoleSelect("Admin")}>
                                <FaUserShield /> Admin
                            </button>
                            <button onClick={() => handleRoleSelect("Teacher")}>
                                <FaChalkboardTeacher /> Teacher
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="auth-top">
                            <button className="back-btn" onClick={() => setRole("")}>← Back</button>
                            <h2>{isRegistering ? "Register" : "Login"} as {role}</h2>
                        </div>

                        <div className="form-fields">
                            {isRegistering && (
                                <>
                                    <div className="input-icon">
                                        <FaUser />
                                        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                                    </div>
                                    <div className="input-icon">
                                        <FaUser />
                                        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
                                    </div>
                                </>
                            )}
                            <div className="input-icon">
                                <FaEnvelope />
                                <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="input-icon">
                                <FaLock />
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                            </div>
                        </div>

                        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Please wait..." : isRegistering ? "Register" : "Login"}
                        </button>

                        <p className="auth-toggle">
                            {isRegistering ? (
                                <>Already registered? <span onClick={() => setIsRegistering(false)}>Login</span></>
                            ) : (
                                <>No account? <span onClick={() => setIsRegistering(true)}>Register</span></>
                            )}
                        </p>

                        {message && <p className="auth-message">{message}</p>}
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
