import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabAcademicTitles = ({ teacherId }) => {
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchData = () => {
        fetch(`/api/v1/teachers/${teacherId}/titles`)
            .then(res => res.json())
            .then(setList);
    };

    /*useEffect(() => {
        fetchData();
    }, []);*/
    useEffect(() => {
        const mockTitles = [
            {
                academicTitleId: 1,
                teacherId,
                titleName: "Professor",
                specialty: "Computer Vision",
                yearConferred: 2021
            },
            {
                academicTitleId: 2,
                teacherId,
                titleName: "Docent",
                specialty: "Machine Learning",
                yearConferred: 2018
            }
        ];
        setList(mockTitles);
    }, []);


    const openModal = (item = null) => {
        setEditItem(
            item || {
                teacherId,
                titleName: "",
                specialty: "",
                yearConferred: new Date().getFullYear(),
            }
        );
        setShowModal(true);
    };

    const save = () => {
        const method = editItem.academicTitleId ? "PUT" : "POST";
        const url = editItem.academicTitleId
            ? `/api/v1/teachers/${teacherId}/titles/${editItem.academicTitleId}`
            : `/api/v1/teachers/${teacherId}/titles`;

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
        fetch(`/api/v1/teachers/${teacherId}/titles/${id}`, { method: "DELETE" }).then(fetchData);
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Title</button>

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
                        <h3>{editItem.academicTitleId ? "Edit Title" : "Add Title"}</h3>

                        <input
                            placeholder="Title Name"
                            value={editItem.titleName}
                            onChange={(e) => setEditItem({ ...editItem, titleName: e.target.value })}
                        />
                        <input
                            placeholder="Specialty"
                            value={editItem.specialty}
                            onChange={(e) => setEditItem({ ...editItem, specialty: e.target.value })}
                        />
                        <input
                            placeholder="Year"
                            type="number"
                            value={editItem.yearConferred}
                            onChange={(e) => setEditItem({ ...editItem, yearConferred: parseInt(e.target.value) })}
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
