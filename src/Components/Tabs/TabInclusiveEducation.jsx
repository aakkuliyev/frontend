import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabInclusiveEducation = ({ teacherId }) => {
    const [docs, setDocs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editDoc, setEditDoc] = useState(null);

    const fetchWithToken = (url, options = {}) => {
        const token = localStorage.getItem("token");
        return fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...(options.headers || {}),
            },
        });
    };

    const fetchData = async () => {
        if (!teacherId) return;
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/inclusive-educations`
            );
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();
            setDocs(data);
        } catch (err) {
            console.error("Fetch inclusive data error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [teacherId]);

    const openModal = (doc = null) => {
        setEditDoc(
            doc || {
                teacherId,
                courses: "",
                internships: "",
            }
        );
        setShowModal(true);
    };

    const saveDoc = async () => {
        const method = editDoc.inclusiveEducationId ? "PUT" : "POST";
        const url = editDoc.inclusiveEducationId
            ? `/api/v1/teachers/${teacherId}/inclusive-educations/${editDoc.inclusiveEducationId}`
            : `/api/v1/teachers/${teacherId}/inclusive-educations`;
        try {
            const res = await fetchWithToken(url, {
                method,
                body: JSON.stringify(editDoc),
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            setShowModal(false);
            fetchData();
        } catch (err) {
            console.error("Save inclusive data error:", err);
        }
    };

    const deleteDoc = async (id) => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/inclusive-educations/${id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            fetchData();
        } catch (err) {
            console.error("Delete inclusive data error:", err);
        }
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Inclusive Info</button>
            <div className="academic-list">
                {docs.map((doc) => (
                    <div key={doc.inclusiveEducationId} className="academic-card">
                        <div>
                            <strong>Courses:</strong> {doc.courses}<br />
                            <strong>Internships:</strong> {doc.internships}
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(doc)}>✏️</button>
                            <button onClick={() => deleteDoc(doc.inclusiveEducationId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editDoc.inclusiveEducationId ? "Edit Inclusive Info" : "Add Inclusive Info"}</h3>

                        <div className="form-group">
                            <label htmlFor="courses">Courses</label>
                            <textarea
                                id="courses"
                                placeholder="Courses"
                                value={editDoc.courses}
                                onChange={(e) => setEditDoc({ ...editDoc, courses: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="internships">Internships</label>
                            <textarea
                                id="internships"
                                placeholder="Internships"
                                value={editDoc.internships}
                                onChange={(e) => setEditDoc({ ...editDoc, internships: e.target.value })}
                            />
                        </div>
                        <div className="modal-actions">
                            <button onClick={saveDoc}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabInclusiveEducation;