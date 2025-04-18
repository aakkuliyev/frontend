import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabJobInfo = ({ teacherId }) => {
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchData = () => {
        fetch(`/api/v1/teachers/${teacherId}/jobs`)
            .then(res => res.json())
            .then(setList);
    };

    /*useEffect(() => {
        fetchData();
    }, []);*/

    useEffect(() => {
        const mockJobs = [
            {
                jobId: 1,
                teacherId,
                organizationName: "IITU",
                organizationAddress: "Manas Street 34a",
                position: "Lecturer",
                workExperience: 5,
                mainWorkFlag: true
            },
            {
                jobId: 2,
                teacherId,
                organizationName: "KazNU",
                organizationAddress: "Al-Farabi Ave",
                position: "Senior Lecturer",
                workExperience: 2,
                mainWorkFlag: false
            }
        ];
        setList(mockJobs);
    }, []);


    const openModal = (item = null) => {
        setEditItem(
            item || {
                teacherId,
                organizationName: "",
                organizationAddress: "",
                position: "",
                workExperience: 0,
                mainWorkFlag: false,
            }
        );
        setShowModal(true);
    };

    const save = () => {
        const method = editItem.jobId ? "PUT" : "POST";
        const url = editItem.jobId
            ? `/api/v1/teachers/${teacherId}/jobs/${editItem.jobId}`
            : `/api/v1/teachers/${teacherId}/jobs`;

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
        fetch(`/api/v1/teachers/${teacherId}/jobs/${id}`, { method: "DELETE" }).then(fetchData);
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Job</button>

            <div className="academic-list">
                {list.map((job) => (
                    <div key={job.jobId} className="academic-card">
                        <div>
                            <strong>{job.organizationName}</strong><br />
                            {job.position} — {job.workExperience} yrs {job.mainWorkFlag ? "(Main)" : ""}
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(job)}>✏️</button>
                            <button onClick={() => remove(job.jobId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editItem.jobId ? "Edit Job" : "Add Job"}</h3>

                        <input placeholder="Organization Name" value={editItem.organizationName} onChange={(e) => setEditItem({ ...editItem, organizationName: e.target.value })} />
                        <input placeholder="Address" value={editItem.organizationAddress} onChange={(e) => setEditItem({ ...editItem, organizationAddress: e.target.value })} />
                        <input placeholder="Position" value={editItem.position} onChange={(e) => setEditItem({ ...editItem, position: e.target.value })} />
                        <input type="number" placeholder="Experience (years)" value={editItem.workExperience} onChange={(e) => setEditItem({ ...editItem, workExperience: parseInt(e.target.value) })} />
                        <label>
                            <input type="checkbox" checked={editItem.mainWorkFlag} onChange={(e) => setEditItem({ ...editItem, mainWorkFlag: e.target.checked })} />
                            Main Work Place
                        </label>

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

export default TabJobInfo;
