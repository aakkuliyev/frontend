// src/Components/ManageTeachersModal.jsx
import React, { useEffect, useState } from "react";
import "./ManageTeacherModal.css";

function ManageTeachersModal({ discipline, onClose }) {
    const [teachers, setTeachers] = useState([]);
    const [assigned, setAssigned] = useState({});
    const [search, setSearch] = useState("");

    // Загружаем всех преподавателей
    useEffect(() => {
        fetch("/api/v1/teachers")
            .then((res) => res.json())
            .then((data) => setTeachers(data))
            .catch(() => setTeachers([]));
    }, []);

    // Загружаем уже назначенных преподавателей
    useEffect(() => {
        fetch(`/api/v1/teachers/1/disciplines`) // заменишь на getAll и фильтрацию
            .then((res) => res.json())
            .then((data) => {
                const ids = new Set(
                    data.filter((d) => d.disciplineId === discipline.id).map((d) => d.teacherId)
                );
                setAssigned((prev) => {
                    const map = {};
                    teachers.forEach((t) => {
                        map[t.teacherId] = ids.has(t.teacherId);
                    });
                    return map;
                });
            });
    }, [discipline, teachers]);

    const handleToggle = (id) => {
        setAssigned((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSave = async () => {
        const promises = [];

        Object.entries(assigned).forEach(([teacherId, isChecked]) => {
            const url = `/api/v1/teachers/${teacherId}/disciplines/${discipline.id}`;
            if (isChecked) {
                promises.push(
                    fetch(`/api/v1/teachers/${teacherId}/disciplines`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            disciplineId: discipline.id,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        })
                    })
                );
            } else {
                promises.push(fetch(url, { method: "DELETE" }));
            }
        });

        await Promise.all(promises);
        onClose();
    };

    const filtered = teachers.filter((t) =>
        `${t.user.firstName} ${t.user.lastName}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content modal-wide">
                <div className="modal-header">
                    <h3>Manage Teachers – {discipline.name}</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search teachers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="teacher-list">
                    {filtered.map((teacher) => (
                        <div key={teacher.teacherId} className="teacher-item">
                            <div className="teacher-info">
                                <img src="https://i.pravatar.cc/40" alt="avatar" />
                                <div>
                                    <strong>{teacher.user.firstName} {teacher.user.lastName}</strong>
                                    <p>{teacher.user.email}</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={assigned[teacher.teacherId] || false}
                                onChange={() => handleToggle(teacher.teacherId)}
                            />
                        </div>
                    ))}
                </div>

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="save-btn" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default ManageTeachersModal;
