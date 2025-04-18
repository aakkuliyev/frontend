import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabEducation = ({ teacherId }) => {
    const [educations, setEducations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchEducations = () => {
        fetch(`/api/v1/teachers/${teacherId}/educations`)
            .then(res => res.json())
            .then(setEducations)
            .catch(console.error);
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    const openModal = (item = null) => {
        setEditItem(item || {
            teacherId,
            institutionName: "",
            specialty: "",
            diplomaQualification: "",
            startYear: "",
            endYear: "",
            certificateNumber: "",
        });
        setShowModal(true);
    };

    const handleSave = () => {
        const method = editItem.educationId ? "PUT" : "POST";
        const url = editItem.educationId
            ? `/api/v1/teachers/${teacherId}/educations/${editItem.educationId}`
            : `/api/v1/teachers/${teacherId}/educations`;

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editItem),
        })
            .then(() => {
                setShowModal(false);
                fetchEducations();
            });
    };

    const handleDelete = (educationId) => {
        fetch(`/api/v1/teachers/${teacherId}/educations/${educationId}`, {
            method: "DELETE"
        }).then(fetchEducations);
    };

    return (
        <div className="education-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Education</button>

            <div className="education-list">
                {educations.map((ed) => (
                    <div key={ed.educationId} className="education-card">
                        <div>
                            <strong>{ed.institutionName}</strong><br />
                            {ed.specialty} ({ed.startYear}–{ed.endYear})
                        </div>
                        <div className="edu-actions">
                            <button onClick={() => openModal(ed)}>✏️</button>
                            <button onClick={() => handleDelete(ed.educationId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editItem.educationId ? "Edit Education" : "Add Education"}</h3>

                        <input
                            placeholder="Institution Name"
                            value={editItem.institutionName}
                            onChange={(e) => setEditItem({ ...editItem, institutionName: e.target.value })}
                        />
                        <input
                            placeholder="Specialty"
                            value={editItem.specialty}
                            onChange={(e) => setEditItem({ ...editItem, specialty: e.target.value })}
                        />
                        <input
                            placeholder="Qualification"
                            value={editItem.diplomaQualification}
                            onChange={(e) => setEditItem({ ...editItem, diplomaQualification: e.target.value })}
                        />
                        <input
                            placeholder="Start Year"
                            type="number"
                            value={editItem.startYear}
                            onChange={(e) => setEditItem({ ...editItem, startYear: parseInt(e.target.value) })}
                        />
                        <input
                            placeholder="End Year"
                            type="number"
                            value={editItem.endYear}
                            onChange={(e) => setEditItem({ ...editItem, endYear: parseInt(e.target.value) })}
                        />
                        <input
                            placeholder="Certificate Number"
                            value={editItem.certificateNumber}
                            onChange={(e) => setEditItem({ ...editItem, certificateNumber: e.target.value })}
                        />

                        <div className="modal-actions">
                            <button onClick={handleSave}>💾 Save</button>
                            <button onClick={() => setShowModal(false)}>❌ Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabEducation;
