import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,    // Dashboard
    FaUsers,            // Users
    FaChalkboardTeacher,// Teachers
    FaBook,             // Disciplines
    FaFileAlt,          // Reports
    FaUser,             // My Profile
    FaSignOutAlt        // Logout
} from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import "./Sidebar.css";

function Sidebar() {
    const [userName, setUserName] = useState("Guest");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.email) setUserName(decoded.email);
                else if (decoded.sub) setUserName(decoded.sub);
                else setUserName("Authorized user");
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, []);

    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <h2>Computer Engineering</h2>
                <div className="sidebar-email">{userName}</div>
            </div>

            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active-link" : "") }>
                        <FaTachometerAlt className="sidebar-icon" />
                        <span className="sidebar-text">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/teachers" className={({ isActive }) => (isActive ? "active-link" : "") }>
                        <FaChalkboardTeacher className="sidebar-icon" />
                        <span className="sidebar-text">Teachers</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/disciplines" className={({ isActive }) => (isActive ? "active-link" : "") }>
                        <FaBook className="sidebar-icon" />
                        <span className="sidebar-text">Disciplines</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/reports" className={({ isActive }) => (isActive ? "active-link" : "") }>
                        <FaFileAlt className="sidebar-icon" />
                        <span className="sidebar-text">Reports</span>
                    </NavLink>
                </li>
            </ul>

            <div className="sidebar-logout">
                <NavLink to="/admin/logout" className={({ isActive }) => (isActive ? "active-link" : "") }>
                    <FaSignOutAlt className="sidebar-icon" />
                    <span className="sidebar-text">Logout</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;