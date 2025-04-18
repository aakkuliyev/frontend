// src/Pages/TeacherProfileMock.jsx
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
    "Personal Info",
    "Education",
    "Academic Degrees",
    "Academic Titles",
    "Job Info",
    "Disciplines",
    "Foreign Cognition",
    "Inclusive Education",
];

const TeacherProfileMock = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Personal Info");
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockTeacher = {
            teacherId: parseInt(id),
            user: {
                firstName: "Aibek",
                lastName: "Shynazbek",
                email: "aibek@university.kz",
            },
            dateOfBirth: "1999-01-01",
            placeOfBirth: "Almaty",
            criminalRecord: "None",
            hasMedicalBook: true,
            militaryRank: "Lieutenant",
            otherTitles: "Senior Lecturer",
            createdAt: "2024-01-10T10:00:00Z",
            updatedAt: "2024-03-12T12:00:00Z",
        };

        setTeacher(mockTeacher);
        setLoading(false);
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
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === "Personal Info" && <TabPersonalInfo teacher={teacher} />}
                {activeTab === "Education" && <TabEducation teacherId={teacher.teacherId} />}
                {activeTab === "Academic Degrees" && <TabAcademicDegrees teacherId={teacher.teacherId} />}
                {activeTab === "Academic Titles" && <TabAcademicTitles teacherId={teacher.teacherId} />}
                {activeTab === "Job Info" && <TabJobInfo teacherId={teacher.teacherId} />}
                {activeTab === "Disciplines" && <TabDisciplines teacherId={teacher.teacherId} />}
                {activeTab === "Foreign Cognition" && <TabForeignCognition teacherId={teacher.teacherId} />}
                {activeTab === "Inclusive Education" && <TabInclusiveEducation teacherId={teacher.teacherId} />}
            </div>
        </div>
    );
};

export default TeacherProfileMock;
