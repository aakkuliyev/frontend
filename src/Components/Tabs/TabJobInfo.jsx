import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabJobInfo = ({ teacherId }) => {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editJob, setEditJob] = useState(null);

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
            const res = await fetchWithToken(`/api/v1/teachers/${teacherId}/jobinfo`);
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();
            setJobs(data);
        } catch (error) {
            console.error("Fetch jobs error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [teacherId]);

    const openModal = (job = null) => {
        setEditJob(
            job || {
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

    const saveJob = async () => {
        const method = editJob.jobId ? "PUT" : "POST";
        const url = editJob.jobId
            ? `/api/v1/teachers/${teacherId}/jobinfo/${editJob.jobId}`
            : `/api/v1/teachers/${teacherId}/jobinfo`;

        try {
            const res = await fetchWithToken(url, { method, body: JSON.stringify(editJob) });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error("Save job error:", error);
        }
    };

    const deleteJob = async (jobId) => {
        try {
            const res = await fetchWithToken(
                `/api/v1/teachers/${teacherId}/jobinfo/${jobId}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            fetchData();
        } catch (error) {
            console.error("Delete job error:", error);
        }
    };

    return (
        <div className="academic-tab">
            <button className="add-button" onClick={() => openModal()}>+ Add Job</button>
            <div className="academic-list">
                {jobs.map((job) => (
                    <div key={job.jobId} className="academic-card">
                        <div>
                            <strong>{job.organizationName}</strong><br />
                            {job.position} — {job.workExperience} yrs {job.mainWorkFlag && "(Main)"}
                        </div>
                        <div className="actions">
                            <button onClick={() => openModal(job)}>✏️</button>
                            <button onClick={() => deleteJob(job.jobId)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editJob.jobId ? "Edit Job" : "Add Job"}</h3>

                        <div className="form-group">
                            <input
                                placeholder="Organization Name"
                                value={editJob.organizationName}
                                onChange={(e) => setEditJob({ ...editJob, organizationName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Address"
                                value={editJob.organizationAddress}
                                onChange={(e) => setEditJob({ ...editJob, organizationAddress: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                placeholder="Position"
                                value={editJob.position}
                                onChange={(e) => setEditJob({ ...editJob, position: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="Experience (years)"
                                value={editJob.workExperience}
                                onChange={(e) => setEditJob({ ...editJob, workExperience: parseInt(e.target.value, 10) || 0 })}
                            />
                        </div>
                        <div className="form-group checkbox-field">
                            <input
                                id="mainWork"
                                type="checkbox"
                                checked={editJob.mainWorkFlag}
                                onChange={(e) => setEditJob({ ...editJob, mainWorkFlag: e.target.checked })}
                            />
                            <label htmlFor="mainWork" className="checkbox-label">Main Work Place</label>
                        </div>

                        <div className="modal-actions">
                            <button onClick={saveJob}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabJobInfo;
