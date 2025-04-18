// src/Pages/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/TeacherDashboard.css";
import { FaUserEdit, FaBookOpen, FaSignOutAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import MyProfile from "./MyProfile";

function TeacherDashboard() {
    const navigate = useNavigate();
    const [teacherName, setTeacherName] = useState("Teacher");
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const name = `${decoded?.firstName || ""} ${decoded?.lastName || ""}`.trim();
                if (name) setTeacherName(name);
            } catch (e) {
                console.error("Token decode error", e);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (showProfile) {
        return <MyProfile />;
    }

    return (
        <div className="teacher-dashboard">
            <h2 className="dashboard-title">Welcome, {teacherName} 👋</h2>

            <div className="teacher-actions">
                <button onClick={() => setShowProfile(true)}> <FaUserEdit /> Edit Profile </button>
                <button onClick={() => navigate("/teacher/disciplines")}> <FaBookOpen /> My Disciplines </button>
                <button onClick={handleLogout}> <FaSignOutAlt /> Logout </button>
            </div>

            <div className="dashboard-section">
                <h3>Recent Activity</h3>
                <p>No recent activity available.</p>
            </div>
        </div>
    );
}

export default TeacherDashboard;
