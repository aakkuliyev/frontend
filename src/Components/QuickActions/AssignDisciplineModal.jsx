// src/Components/AssignDisciplineModal.jsx
import React, { useEffect, useState } from "react";
import "./AssignDisciplineModal.css";

const mockDisciplines = [
    { id: 1, name: "Algorithms" },
    { id: 2, name: "Database Systems" },
    { id: 3, name: "Software Engineering" },
    { id: 4, name: "Computer Networks" }
];

function AssignDisciplineModal({ isOpen, onClose }) {
    const [teachers, setTeachers] = useState([]);
    const [teacherId, setTeacherId] = useState("");
    const [disciplineId, setDisciplineId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Получаем преподавателей
    useEffect(() => {
        if (isOpen) {
            fetch("/api/v1/teachers")
                .then((res) => res.json())
                .then((data) => setTeachers(data))
                .catch(() => setTeachers([]));
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!teacherId || !disciplineId) {
            setMessage("Please select both fields");
            return;
        }

        setLoading(true);
        setMessage("");

        const dto = {
            disciplineId: parseInt(disciplineId),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        try {
            const response = await fetch(`/api/v1/teachers/${teacherId}/disciplines`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto)
            });

            if (!response.ok) throw new Error("Failed to assign discipline");

            setMessage("✅ Discipline successfully assigned!");
            setTeacherId("");
            setDisciplineId("");
        } catch (err) {
            setMessage("❌ Error assigning discipline.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Assign Discipline to Teacher</h3>

                <label>Teacher</label>
                <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
                    <option value="">Select teacher</option>
                    {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.user?.firstName} {t.user?.lastName}
                        </option>
                    ))}
                </select>

                <label>Discipline</label>
                <select value={disciplineId} onChange={(e) => setDisciplineId(e.target.value)}>
                    <option value="">Select discipline</option>
                    {mockDisciplines.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>

                {message && <p className="modal-message">{message}</p>}

                <div className="modal-buttons">
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Assigning..." : "Assign"}
                    </button>
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AssignDisciplineModal;
