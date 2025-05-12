// src/Pages/TeacherProfilePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TabPersonalInfo       from "../Components/Tabs/TabPersonalInfo";
import TabEducation          from "../Components/Tabs/TabEducation";
import TabAcademicDegrees    from "../Components/Tabs/TabAcademicDegrees";
import TabAcademicTitles     from "../Components/Tabs/TabAcademicTitle";
import TabJobInfo            from "../Components/Tabs/TabJobInfo";
import TabDisciplines        from "../Components/Tabs/TabDisciplines";
import TabForeignCognition   from "../Components/Tabs/TabForeignCognition";
import TabInclusiveEducation from "../Components/Tabs/TabInclusiveEducation";

import "./CSS/TeacherProfilePage.css";

const tabs = [
    { key: "personal", label: "Personal Info",     component: TabPersonalInfo },
    { key: "education", label: "Education",       component: TabEducation },
    { key: "degrees",   label: "Academic Degrees",component: TabAcademicDegrees },
    { key: "titles",    label: "Academic Titles", component: TabAcademicTitles },
    { key: "jobs",      label: "Job Info",        component: TabJobInfo },
    { key: "subjects",  label: "Disciplines",     component: TabDisciplines },
    { key: "foreign",   label: "Foreign Cognition", component: TabForeignCognition },
    { key: "inclusive", label: "Inclusive Education", component: TabInclusiveEducation },
];

const TeacherProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const teacherId = parseInt(id, 10);

    const [teacher, setTeacher]   = useState(null);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const [activeTab, setActiveTab] = useState("personal");

    const fetchWithToken = useCallback((url) => {
        const token = localStorage.getItem("token");
        return fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchWithToken(`/api/v1/teachers/${teacherId}`)
            .then(res => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then(data => {
                setTeacher(data);
                setLoading(false);
                setActiveTab("personal");
            })
            .catch(err => {
                console.error("Fetch teacher failed:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [teacherId, fetchWithToken]);

    if (loading) return <div className="profile-loading">Loading...</div>;
    if (error)   return <div className="profile-error">Ошибка: {error}</div>;
    if (!teacher) return <div className="profile-error">Teacher not found</div>;

    const ActiveTabComponent = tabs.find(t => t.key === activeTab)?.component;

    return (
        <div className="teacher-profile-page">
            <div className="profile-header">
                <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
                <div>
                    <h2>{teacher.user.firstName} {teacher.user.lastName}</h2>
                    <p className="email">{teacher.user.email}</p>
                </div>
            </div>

            <div className="tab-horizontal">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {ActiveTabComponent && (
                    <ActiveTabComponent
                        teacher={activeTab === "personal" ? teacher : undefined}
                        teacherId={teacherId}
                        fetchWithToken={fetchWithToken}
                    />
                )}
            </div>
        </div>
    );
};

export default TeacherProfilePage;

/*
TeacherProfilePage.css (rewrite)

.teacher-profile-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.back-button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 4px;
}
.back-button:hover {
  background: #ddd;
}
.email {
  color: #666;
  margin-top: 0.25rem;
}
.tab-horizontal {
  display: flex;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 1rem;
}
.tab-btn {
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
  transition: background 0.2s;
}
.tab-btn:hover {
  background: #f9f9f9;
}
.tab-btn.active {
  border-bottom: 3px solid #007bff;
  color: #007bff;
  font-weight: bold;
}
.tab-content {
  padding: 1rem;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
}
*/
