// src/Pages/MyProfile.jsx
import React, { useEffect, useState } from "react";
import "./CSS/TeacherProfileSelf.css";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import TabPersonalInfo from "../Components/Tabs/TabPersonalInfo";
import TabEducation from "../Components/Tabs/TabEducation";
import TabAcademicDegrees from "../Components/Tabs/TabAcademicDegrees";
import TabAcademicTitles from "../Components/Tabs/TabAcademicTitle";
import TabJobInfo from "../Components/Tabs/TabJobInfo";
import TabDisciplines from "../Components/Tabs/TabDisciplines";
import TabForeignCognition from "../Components/Tabs/TabForeignCognition";
import TabInclusiveEducation from "../Components/Tabs/TabInclusiveEducation";

import {
    FaAddressCard,
    FaGraduationCap,
    FaChalkboardTeacher,
    FaBriefcase,
    FaBookOpen,
    FaGlobe,
    FaAccessibleIcon
} from "react-icons/fa";

const tabs = [
    { label: "Personal Info", icon: <FaAddressCard /> },
    { label: "Education", icon: <FaGraduationCap /> },
    { label: "Academic Degrees", icon: <FaGraduationCap /> },
    { label: "Academic Titles", icon: <FaChalkboardTeacher /> },
    { label: "Job Info", icon: <FaBriefcase /> },
    { label: "Disciplines", icon: <FaBookOpen /> },
    { label: "Foreign Cognition", icon: <FaGlobe /> },
    { label: "Inclusive Education", icon: <FaAccessibleIcon /> },
];

function MyProfile() {
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("Personal Info");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            // fetch(`/api/v1/teachers/user/${userId}`)
            //   .then(res => res.json())
            //   .then(data => setTeacher(data))
            //   .catch(() => setMessage("Error loading profile"))
            //   .finally(() => setLoading(false));

            setTimeout(() => {
                setTeacher({
                    teacherId: 1,
                    firstName: "Aibek",
                    lastName: "Shynazbek",
                    email: "aibek@iitu.kz",
                    dateOfBirth: "1999-01-01",
                    placeOfBirth: "Almaty",
                    criminalRecord: "None",
                    militaryRank: "Lieutenant",
                    otherTitles: "Senior Lecturer",
                    department: "Computer Engineering",
                    phone: "+7 (777) 123-4567",
                    address: "Manas 34/1, Almaty",
                    employeeId: "#IITU2025",
                    medicalBookValidTill: "2025"
                });
                setLoading(false);
            }, 500);
        } catch (e) {
            console.error(e);
            setMessage("Invalid token");
            setLoading(false);
        }
    }, []);

    if (loading) return <div className="teacher-profile-page">Loading...</div>;
    if (message) return <div className="teacher-profile-page">{message}</div>;

    return (
        <div className="teacher-profile-page">
            <div className="profile-header">
                <FaUserCircle className="profile-avatar" />
                <h2>{teacher.firstName} {teacher.lastName}</h2>
                <p className="profile-sub">{teacher.otherTitles || "Teacher"}</p>
            </div>

            <div className="profile-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={`tab-btn ${activeTab === tab.label ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.icon} {tab.label}
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
}

export default MyProfile;