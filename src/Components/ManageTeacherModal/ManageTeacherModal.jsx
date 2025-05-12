// src/Components/ManageTeacherModal/ManageTeacherModal.jsx
import React, { useEffect, useState } from 'react';
import './ManageTeacherModal.css';

// простой fetch-helper, без хуков
function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    }).then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.status === 204 ? null : res.json();
    });
}

function ManageTeachersModal({ discipline, onClose }) {
    const [teachers, setTeachers] = useState([]);
    const [assigned, setAssigned] = useState(new Set());
    const [search, setSearch]     = useState('');

    // загрузить всех преподавателей
    useEffect(() => {
        fetchWithToken('/api/v1/teachers')
            .then(setTeachers)
            .catch(console.error);
    }, []);

    // загрузить назначенных на текущую дисциплину
    useEffect(() => {
        fetchWithToken(`/api/v1/disciplines/${discipline.disciplineId}/teachers`)
            .then((list) =>
                setAssigned(new Set(list.map((t) => t.teacherId)))
            )
            .catch(() => setAssigned(new Set()));
    }, [discipline]);

    const toggle = (id) => {
        setAssigned((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const save = () => {
        const requests = teachers.map((t) => {
            const base = `/api/v1/teachers/${t.teacherId}/disciplines`;
            return assigned.has(t.teacherId)
                ? fetchWithToken(base, {
                    method: 'POST',
                    body: JSON.stringify({ disciplineId: discipline.disciplineId }),
                })
                : fetchWithToken(`${base}/${discipline.disciplineId}`, {
                    method: 'DELETE',
                });
        });

        Promise.all(requests)
            .then(onClose)
            .catch((e) => alert(e.message));
    };

    const filtered = teachers.filter((t) =>
        `${t.user.firstName} ${t.user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content modal-wide">
                <div className="modal-header">
                    <h3>Manage – {discipline.disciplineName}</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <input
                    className="search-input"
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="teacher-list">
                    {filtered.map((t) => (
                        <div key={t.teacherId} className="teacher-item">
                            <div className="teacher-info">
                                <span className="avatar">{t.user.firstName[0]}</span>
                                <div>
                                    <strong>{t.user.firstName} {t.user.lastName}</strong>
                                    <p>{t.user.email}</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={assigned.has(t.teacherId)}
                                onChange={() => toggle(t.teacherId)}
                            />
                        </div>
                    ))}
                </div>

                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={save}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default ManageTeachersModal;
