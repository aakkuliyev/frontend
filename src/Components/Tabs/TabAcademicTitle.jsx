// src/Components/Tabs/TabAcademicTitles.jsx
import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabAcademicTitles = ({ teacherId }) => {
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

    // Загрузить список академических званий
    const fetchData = async () => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/academicTitles`
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setList(data);
        } catch (err) {
            console.error("Error fetching academic titles:", err);
        }
    };

    useEffect(() => {
        if (teacherId) fetchData();
    }, [teacherId]);

    const openModal = (item = null) => {
        setEditItem(
            item ?? {
                titleName: "",
                specialty: "",
                yearConferred: new Date().getFullYear(),
            }
        );
        setShowModal(true);
    };

    const save = async () => {
        try {
            const isEdit = Boolean(editItem.academicTitleId);
            const url    = isEdit
                ? `/api/v1/teachers/${teacherId}/academicTitles/${editItem.academicTitleId}`
                : `/api/v1/teachers/${teacherId}/academicTitles`;
            const res = await fetchWithToken(url, {
                method:  isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(editItem),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setShowModal(false);
            fetchData();
        } catch (err) {
            console.error("Error saving academic title:", err);
        }
    };

    const remove = async (id) => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/academicTitles/${id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            fetchData();
        } catch (err) {
            console.error("Error deleting academic title:", err);
        }
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>
                + Add Title
            </button>

            <div className="academic-list">
                {list.map((t) => (
                    <div key={t.academicTitleId} className="academic-card">
                        <div>
                            <strong>{t.titleName}</strong> in {t.specialty} ({t.yearConferred})
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(t)}>✏️</button>
                            <button onClick={() => remove(t.academicTitleId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>
                            {editItem.academicTitleId ? "Edit Title" : "Add Title"}
                        </h3>
                        <input
                            placeholder="Title Name"
                            value={editItem.titleName}
                            onChange={(e) =>
                                setEditItem({ ...editItem, titleName: e.target.value })
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
                            value={editItem.yearConferred}
                            onChange={(e) =>
                                setEditItem({
                                    ...editItem,
                                    yearConferred: parseInt(e.target.value, 10) || "",
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

export default TabAcademicTitles;
