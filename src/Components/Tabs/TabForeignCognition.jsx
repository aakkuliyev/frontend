import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabForeignCognition = ({ teacherId }) => {
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
                `/api/v1/teachers/${teacherId}/foreign-cognitions`
            );
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();
            setDocs(data);
        } catch (err) {
            console.error("Fetch docs error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [teacherId]);

    const openModal = (doc = null) => {
        setEditDoc(
            doc || {
                teacherId,
                documentName: "",
                issueDate: new Date().toISOString().slice(0, 10),
            }
        );
        setShowModal(true);
    };

    const saveDoc = async () => {
        const method = editDoc.recognitionId ? "PUT" : "POST";
        const url = editDoc.recognitionId
            ? `/api/v1/teachers/${teacherId}/foreign-cognitions/${editDoc.recognitionId}`
            : `/api/v1/teachers/${teacherId}/foreign-cognitions`;

        try {
            const res = await fetchWithToken(url, {
                method,
                body: JSON.stringify(editDoc),
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            setShowModal(false);
            fetchData();
        } catch (err) {
            console.error("Save doc error:", err);
        }
    };

    const deleteDoc = async (id) => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/foreign-cognitions/${id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            fetchData();
        } catch (err) {
            console.error("Delete doc error:", err);
        }
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Document</button>
            <div className="academic-list">
                {docs.map((doc) => (
                    <div key={doc.recognitionId} className="academic-card">
                        <div>
                            <strong>{doc.documentName}</strong> — {doc.issueDate.slice(0, 10)}
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(doc)}>✏️</button>
                            <button onClick={() => deleteDoc(doc.recognitionId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editDoc.recognitionId ? "Edit Document" : "Add Document"}</h3>

                        <div className="form-group">
                            <input
                                placeholder="Document Name"
                                value={editDoc.documentName}
                                onChange={(e) =>
                                    setEditDoc({ ...editDoc, documentName: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                value={editDoc.issueDate}
                                onChange={(e) =>
                                    setEditDoc({ ...editDoc, issueDate: e.target.value })
                                }
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

export default TabForeignCognition;