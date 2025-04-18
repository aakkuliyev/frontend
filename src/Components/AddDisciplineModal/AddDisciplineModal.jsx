// src/Components/AddDisciplineModal.jsx
import React, { useState } from "react";
import "./AddDisciplineModal.css";

function AddDisciplineModal({ isOpen, onClose, onSuccess }) {
    const [disciplineName, setDisciplineName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!disciplineName.trim()) {
            setMessage("Discipline name is required.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/v1/disciplines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ disciplineName })
            });

            if (!response.ok) throw new Error("Failed to create");

            const result = await response.json();
            onSuccess?.(result); // опциональный коллбек при успехе
            setDisciplineName("");
            onClose();
        } catch (err) {
            setMessage("Error creating discipline.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add New Discipline</h3>

                <label>Discipline Name</label>
                <input
                    type="text"
                    value={disciplineName}
                    onChange={(e) => setDisciplineName(e.target.value)}
                    placeholder="e.g. Software Engineering"
                />

                {message && <p className="modal-message">{message}</p>}

                <div className="modal-buttons">
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                    <button onClick={handleCreate} disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddDisciplineModal;
