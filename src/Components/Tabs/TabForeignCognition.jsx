import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabForeignCognition = ({ teacherId }) => {
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchData = () => {
        fetch(`/api/v1/teachers/${teacherId}/foreign-cognitions`)
            .then(res => res.json())
            .then(setList);
    };

    /*useEffect(() => {
        fetchData();
    }, []);*/
    useEffect(() => {
        const mockList = [
            {
                recognitionId: 1,
                teacherId,
                documentName: "Diploma Recognition Germany",
                issueDate: "2022-04-10"
            },
            {
                recognitionId: 2,
                teacherId,
                documentName: "USA Equivalency Report",
                issueDate: "2021-12-05"
            }
        ];
        setList(mockList);
    }, []);


    const openModal = (item = null) => {
        setEditItem(item || {
            teacherId,
            documentName: "",
            issueDate: new Date().toISOString().slice(0, 10),
        });
        setShowModal(true);
    };

    const save = () => {
        const method = editItem.recognitionId ? "PUT" : "POST";
        const url = editItem.recognitionId
            ? `/api/v1/teachers/${teacherId}/foreign-cognitions/${editItem.recognitionId}`
            : `/api/v1/teachers/${teacherId}/foreign-cognitions`;

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editItem)
        }).then(() => {
            setShowModal(false);
            fetchData();
        });
    };

    const remove = (id) => {
        fetch(`/api/v1/teachers/${teacherId}/foreign-cognitions/${id}`, { method: "DELETE" }).then(fetchData);
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Document</button>

            <div className="academic-list">
                {list.map((item) => (
                    <div key={item.recognitionId} className="academic-card">
                        <div>
                            <strong>{item.documentName}</strong> — {item.issueDate?.slice(0, 10)}
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(item)}>✏️</button>
                            <button onClick={() => remove(item.recognitionId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editItem.recognitionId ? "Edit" : "Add"} Cognition</h3>
                        <input
                            placeholder="Document Name"
                            value={editItem.documentName}
                            onChange={(e) => setEditItem({ ...editItem, documentName: e.target.value })}
                        />
                        <input
                            type="date"
                            value={editItem.issueDate}
                            onChange={(e) => setEditItem({ ...editItem, issueDate: e.target.value })}
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

export default TabForeignCognition;
