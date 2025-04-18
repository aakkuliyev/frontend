// src/Pages/TeacherProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabPersonalInfo from "../Components/Tabs/TabPersonalInfo";
import TabEducation from "../Components/Tabs/TabEducation";
import TabAcademicDegrees from "../Components/Tabs/TabAcademicDegrees";
import TabAcademicTitles from "../Components/Tabs/TabAcademicTitle";
import TabJobInfo from "../Components/Tabs/TabJobInfo";
import TabDisciplines from "../Components/Tabs/TabDisciplines";
import TabForeignCognition from "../Components/Tabs/TabForeignCognition";
import TabInclusiveEducation from "../Components/Tabs/TabInclusiveEducation";
import "./CSS/TeacherProfilePage.css";

const tabs = [
    { label: "Personal", full: "Personal Info", icon: "📄" },
    { label: "Education", full: "Education", icon: "🎓" },
    { label: "Degrees", full: "Academic Degrees", icon: "📜" },
    { label: "Titles", full: "Academic Titles", icon: "🏅" },
    { label: "Jobs", full: "Job Info", icon: "🏢" },
    { label: "Subjects", full: "Disciplines", icon: "📚" },
    { label: "Foreign", full: "Foreign Cognition", icon: "🌍" },
    { label: "Inclusive", full: "Inclusive Education", icon: "🧩" }
];

const TeacherProfilePage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Personal");
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/v1/teachers/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTeacher(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch teacher:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="profile-loading">Loading...</div>;
    if (!teacher) return <div className="profile-error">Teacher not found</div>;

    return (
        <div className="teacher-profile-page">
            <div className="profile-header">
                <h2>{teacher.user?.firstName} {teacher.user?.lastName}</h2>
                <p>{teacher.user?.email}</p>
            </div>

            <div className="tab-horizontal">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={activeTab === tab.label ? "active" : ""}
                        onClick={() => setActiveTab(tab.label)}
                        title={tab.full}
                    >
                        <span className="tab-icon">{tab.icon}</span> {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === "Personal" && <TabPersonalInfo teacher={teacher} />}
                {activeTab === "Education" && <TabEducation teacherId={teacher.teacherId} />}
                {activeTab === "Degrees" && <TabAcademicDegrees teacherId={teacher.teacherId} />}
                {activeTab === "Titles" && <TabAcademicTitles teacherId={teacher.teacherId} />}
                {activeTab === "Jobs" && <TabJobInfo teacherId={teacher.teacherId} />}
                {activeTab === "Subjects" && <TabDisciplines teacherId={teacher.teacherId} />}
                {activeTab === "Foreign" && <TabForeignCognition teacherId={teacher.teacherId} />}
                {activeTab === "Inclusive" && <TabInclusiveEducation teacherId={teacher.teacherId} />}
            </div>
        </div>
    );
};

export default TeacherProfilePage;
