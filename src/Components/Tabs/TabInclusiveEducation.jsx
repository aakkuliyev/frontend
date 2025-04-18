import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabInclusiveEducation = ({ teacherId }) => {
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchData = () => {
        fetch(`/api/v1/teachers/${teacherId}/inclusive-educations`)
            .then(res => res.json())
            .then(setList);
    };

    /*useEffect(() => {
        fetchData();
    }, []);*/
    useEffect(() => {
        const mockList = [
            {
                inclusiveEducationId: 1,
                teacherId,
                courses: "Inclusive Teaching Methods, Special Ed 101",
                internships: "Interned at Inclusive Center for Youth, Helsinki"
            },
            {
                inclusiveEducationId: 2,
                teacherId,
                courses: "Psychological Adaptation in Learning",
                internships: "Summer School for Neurodivergent Students"
            }
        ];
        setList(mockList);
    }, []);


    const openModal = (item = null) => {
        setEditItem(item || {
            teacherId,
            courses: "",
            internships: "",
        });
        setShowModal(true);
    };

    const save = () => {
        const method = editItem.inclusiveEducationId ? "PUT" : "POST";
        const url = editItem.inclusiveEducationId
            ? `/api/v1/teachers/${teacherId}/inclusive-educations/${editItem.inclusiveEducationId}`
            : `/api/v1/teachers/${teacherId}/inclusive-educations`;

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
        fetch(`/api/v1/teachers/${teacherId}/inclusive-educations/${id}`, { method: "DELETE" }).then(fetchData);
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Inclusive Info</button>

            <div className="academic-list">
                {list.map((item) => (
                    <div key={item.inclusiveEducationId} className="academic-card">
                        <div>
                            <strong>Courses:</strong> {item.courses}<br />
                            <strong>Internships:</strong> {item.internships}
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(item)}>✏️</button>
                            <button onClick={() => remove(item.inclusiveEducationId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editItem.inclusiveEducationId ? "Edit" : "Add"} Inclusive Info</h3>
                        <textarea
                            placeholder="Courses"
                            value={editItem.courses}
                            onChange={(e) => setEditItem({ ...editItem, courses: e.target.value })}
                        />
                        <textarea
                            placeholder="Internships"
                            value={editItem.internships}
                            onChange={(e) => setEditItem({ ...editItem, internships: e.target.value })}
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

export default TabInclusiveEducation;
