import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabEducation = ({ teacherId }) => {
    const [educations, setEducations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editEdu, setEditEdu] = useState(null);

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
                `/api/v1/teachers/${teacherId}/educations`
            );
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();
            setEducations(data);
        } catch (err) {
            console.error("Fetch educations error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [teacherId]);

    const openModal = (edu = null) => {
        setEditEdu(
            edu || {
                teacherId,
                institutionName: "",
                specialty: "",
                diplomaQualification: "",
                startYear: "",
                endYear: "",
                certificateNumber: "",
            }
        );
        setShowModal(true);
    };

    const saveEdu = async () => {
        const method = editEdu.educationId ? "PUT" : "POST";
        const url = editEdu.educationId
            ? `/api/v1/teachers/${teacherId}/educations/${editEdu.educationId}`
            : `/api/v1/teachers/${teacherId}/educations`;

        try {
            const res = await fetchWithToken(url, {
                method,
                body: JSON.stringify(editEdu),
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            setShowModal(false);
            fetchData();
        } catch (err) {
            console.error("Save education error:", err);
        }
    };

    const deleteEdu = async (id) => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/educations/${id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            fetchData();
        } catch (err) {
            console.error("Delete education error:", err);
        }
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Education</button>

            <div className="academic-list">
                {educations.map((edu) => (
                    <div key={edu.educationId} className="academic-card">
                        <div>
                            <strong>{edu.institutionName}</strong><br />
                            {edu.specialty} ({edu.startYear}–{edu.endYear})
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(edu)}>✏️</button>
                            <button onClick={() => deleteEdu(edu.educationId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editEdu.educationId ? "Edit Education" : "Add Education"}</h3>

                        <div className="form-group">
                            <label htmlFor="institutionName">Institution Name</label>
                            <input
                                id="institutionName"
                                placeholder="Institution Name"
                                value={editEdu.institutionName}
                                onChange={(e) => setEditEdu({ ...editEdu, institutionName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="specialty">Specialty</label>
                            <input
                                id="specialty"
                                placeholder="Specialty"
                                value={editEdu.specialty}
                                onChange={(e) => setEditEdu({ ...editEdu, specialty: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="qualification">Qualification</label>
                            <input
                                id="qualification"
                                placeholder="Qualification"
                                value={editEdu.diplomaQualification}
                                onChange={(e) =>
                                    setEditEdu({ ...editEdu, diplomaQualification: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startYear">Start Year</label>
                            <input
                                id="startYear"
                                type="number"
                                placeholder="Start Year"
                                value={editEdu.startYear}
                                onChange={(e) =>
                                    setEditEdu({ ...editEdu, startYear: parseInt(e.target.value, 10) || "" })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endYear">End Year</label>
                            <input
                                id="endYear"
                                type="number"
                                placeholder="End Year"
                                value={editEdu.endYear}
                                onChange={(e) =>
                                    setEditEdu({ ...editEdu, endYear: parseInt(e.target.value, 10) || "" })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="certificateNumber">Certificate Number</label>
                            <input
                                id="certificateNumber"
                                placeholder="Certificate Number"
                                value={editEdu.certificateNumber}
                                onChange={(e) =>
                                    setEditEdu({ ...editEdu, certificateNumber: e.target.value })
                                }
                            />
                        </div>

                        <div className="modal-actions">
                            <button onClick={saveEdu}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabEducation;