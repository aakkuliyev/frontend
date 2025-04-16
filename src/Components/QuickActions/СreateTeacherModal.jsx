// src/Components/CreateTeacherModal.jsx
import React, { useState } from "react";
import "./CreateTeacherModal.css";

function CreateTeacherModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async () => {
        const dto = {
            user: {
                ...formData
            }
        };

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setMessage("❗ Fill in all fields");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/v1/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto)
            });

            if (!response.ok) throw new Error("Creation failed");

            setMessage("✅ Teacher successfully created!");
            setFormData({ firstName: "", lastName: "", email: "", password: "" });
        } catch (err) {
            setMessage("❌ Error creating teacher");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create New Teacher</h3>

                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} />

                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />

                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />

                {message && <p className="modal-message">{message}</p>}

                <div className="modal-buttons">
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </button>
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CreateTeacherModal;
