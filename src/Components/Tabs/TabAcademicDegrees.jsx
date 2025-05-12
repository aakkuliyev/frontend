// src/Components/Tabs/TabAcademicDegrees.jsx
import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabAcademicDegrees = ({ teacherId }) => {
    const [list, setList]         = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem]   = useState(null);

    // Утилита для fetch с токеном
    const fetchWithToken = (url, opts = {}) => {
        const token = localStorage.getItem("token");
        return fetch(url, {
            ...opts,
            headers: {
                ...(opts.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        });
    };

    // Загрузить список степеней
    const fetchData = async () => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/academicDegrees`
            );
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const data = await res.json();
            setList(data);
        } catch (err) {
            console.error("Error fetching academic degrees:", err);
        }
    };

    useEffect(() => {
        if (teacherId) fetchData();
    }, [teacherId]);

    const openModal = (item = null) => {
        setEditItem(
            item ?? {
                degreeType: "",
                specialty: "",
                yearAwarded: new Date().getFullYear(),
            }
        );
        setShowModal(true);
    };

    const save = async () => {
        try {
            const method = editItem.academicDegreeId ? "PUT" : "POST";
            const url    = editItem.academicDegreeId
                ? `/api/v1/teachers/${teacherId}/academicDegrees/${editItem.academicDegreeId}`
                : `/api/v1/teachers/${teacherId}/academicDegrees`;

            const res = await fetchWithToken(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editItem),
            });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            setShowModal(false);
            fetchData();
        } catch (err) {
            console.error("Error saving academic degree:", err);
        }
    };

    const remove = async (id) => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/academicDegrees/${id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error(`Status ${res.status}`);
            fetchData();
        } catch (err) {
            console.error("Error deleting academic degree:", err);
        }
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>
                + Add Degree
            </button>

            <div className="academic-list">
                {list.map((d) => (
                    <div key={d.academicDegreeId} className="academic-card">
                        <div>
                            <strong>{d.degreeType}</strong> in {d.specialty} ({d.yearAwarded})
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(d)}>✏️</button>
                            <button onClick={() => remove(d.academicDegreeId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>
                            {editItem.academicDegreeId ? "Edit Degree" : "Add Degree"}
                        </h3>
                        <input
                            placeholder="Degree Type"
                            value={editItem.degreeType}
                            onChange={(e) =>
                                setEditItem({ ...editItem, degreeType: e.target.value })
                            }
                        />
                        <input
                            placeholder="Specialty"
                            value={editItem.specialty}
                            onChange={(e) =>
                                setEditItem({ ...editItem, specialty: e.target.value })
                            }
                        />
                        <input
                            placeholder="Year"
                            type="number"
                            value={editItem.yearAwarded}
                            onChange={(e) =>
                                setEditItem({
                                    ...editItem,
                                    yearAwarded: parseInt(e.target.value, 10) || "",
                                })
                            }
                        />

                        <div className="modal-actions">
                            <button onClick={save}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabAcademicDegrees;
