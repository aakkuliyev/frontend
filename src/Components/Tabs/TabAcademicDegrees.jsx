import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabAcademicDegrees = ({ teacherId }) => {
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchData = () => {
        fetch(`/api/v1/teachers/${teacherId}/degrees`)
            .then(res => res.json())
            .then(setList);
    };

  /*  useEffect(() => {
        fetchData();
    }, []);*/

    useEffect(() => {
        const mockDegrees = [
            {
                academicDegreeId: 1,
                teacherId,
                degreeType: "PhD",
                specialty: "Computer Science",
                yearAwarded: 2020
            },
            {
                academicDegreeId: 2,
                teacherId,
                degreeType: "Master",
                specialty: "Artificial Intelligence",
                yearAwarded: 2017
            }
        ];
        setList(mockDegrees);
    }, []);


    const openModal = (item = null) => {
        setEditItem(
            item || {
                teacherId,
                degreeType: "",
                specialty: "",
                yearAwarded: new Date().getFullYear(),
            }
        );
        setShowModal(true);
    };

    const save = () => {
        const method = editItem.academicDegreeId ? "PUT" : "POST";
        const url = editItem.academicDegreeId
            ? `/api/v1/teachers/${teacherId}/degrees/${editItem.academicDegreeId}`
            : `/api/v1/teachers/${teacherId}/degrees`;

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
        fetch(`/api/v1/teachers/${teacherId}/degrees/${id}`, { method: "DELETE" }).then(fetchData);
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Degree</button>

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
                        <h3>{editItem.academicDegreeId ? "Edit Degree" : "Add Degree"}</h3>

                        <input
                            placeholder="Degree Type"
                            value={editItem.degreeType}
                            onChange={(e) => setEditItem({ ...editItem, degreeType: e.target.value })}
                        />
                        <input
                            placeholder="Specialty"
                            value={editItem.specialty}
                            onChange={(e) => setEditItem({ ...editItem, specialty: e.target.value })}
                        />
                        <input
                            placeholder="Year"
                            type="number"
                            value={editItem.yearAwarded}
                            onChange={(e) => setEditItem({ ...editItem, yearAwarded: parseInt(e.target.value) })}
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
