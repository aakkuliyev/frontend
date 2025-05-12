import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./CreateTeacherModal.css";

// Helper для fetch с JWT
function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
}

function CreateTeacherModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setMessage("❗ Please fill in all fields");
            return;
        }

        setLoading(true);
        setMessage("");

        const payload = { user: { ...formData } };

        try {
            const res = await fetchWithToken('/api/v1/teachers', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const created = await res.json();
            setMessage("✅ Teacher created successfully");
            setFormData({ firstName: "", lastName: "", email: "", password: "" });
            // вызов callback после успешного создания
            if (onSuccess) onSuccess(created);
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to create teacher");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create New Teacher</h3>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {message && <p className={`modal-message ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</p>}

                <div className="modal-buttons">
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

CreateTeacherModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
};

export default CreateTeacherModal;
