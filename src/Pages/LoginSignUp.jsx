import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignUp.css";

function LoginSignUp() {
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

    // При клике на Admin/Teacher
    const handleRoleSelect = (selectedRole) => {
        console.log("Роль выбрана:", selectedRole); // Для отладки
        setRole(selectedRole);
        setIsRegistering(false);
        setMessage("");
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");
        console.log("Отправка формы. role =", role, "isRegistering =", isRegistering);

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
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            // Сохраняем токен
            localStorage.setItem("token", data.token);
            setMessage("✅ Success! Token: " + data.token);

            // Редирект по роли
            if (isRegistering) {
                if (role === "Admin") {
                    navigate("/admin");
                } else if (role === "Teacher") {
                    navigate("/teacher");
                } else {
                    navigate("/welcome");
                }
            } else {
                if (role === "Admin") {
                    navigate("/admin");
                } else if (role === "Teacher") {
                    navigate("/teacher");
                } else {
                    navigate("/dashboard");
                }
            }

        } catch (error) {
            setMessage("❌ Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">

                {/* Если роль не выбрана, показываем выбор роли */}
                {!role ? (
                    <>
                        <h1>Select Role</h1>
                        <div className="role-selection">
                            <button onClick={() => handleRoleSelect("Admin")}>Admin</button>
                            <button onClick={() => handleRoleSelect("Teacher")}>Teacher</button>
                        </div>
                    </>
                ) : (
                    <>
                        <button className="back-button" onClick={() => setRole("")}>
                            ← Back
                        </button>
                        <h1>
                            {isRegistering ? "Register" : "Login"} as {role}
                        </h1>

                        <div className="loginsignup-fields">
                            {isRegistering && (
                                <>
                                    <input
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </>
                            )}
                            <input
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Please wait..." : isRegistering ? "Register" : "Login"}
                        </button>

                        <p className="loginsignup-login">
                            {isRegistering ? (
                                <>
                                    Already have an account?{" "}
                                    <span onClick={() => setIsRegistering(false)}>
                    Login here
                  </span>
                                </>
                            ) : (
                                <>
                                    Don't have an account?{" "}
                                    <span onClick={() => setIsRegistering(true)}>
                    Register
                  </span>
                                </>
                            )}
                        </p>

                        {isRegistering && (
                            <div className="loginsignup-agree">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms">
                                    I agree to the terms of use & privacy policy.
                                </label>
                            </div>
                        )}

                        {message && <p className="loginsignup-message">{message}</p>}
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginSignUp;
