import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,    // для Dashboard
    FaUsers,            // для Users
    FaChalkboardTeacher,// для Teachers
    FaBook,             // для Disciplines
    FaUser,             // для My Profile
    FaSignOutAlt        // для Logout
} from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import "./Sidebar.css";

function Sidebar() {
    const [userName, setUserName] = useState("Guest");

    useEffect(() => {
        // Пробуем получить токен из localStorage
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Предположим, в токене есть либо поле "sub", либо "email",
                // либо "firstname" и "lastname" – зависит от вашего бэкенда.
                // Например, если есть decoded.sub:
                // setUserName(decoded.sub);

                // Или если храните в токене decoded.firstName:
                // setUserName(decoded.firstName);

                // Пример: проверим, что у нас есть email:
                if (decoded.email) {
                    setUserName(decoded.email);
                } else if (decoded.sub) {
                    setUserName(decoded.sub);
                } else {
                    setUserName("Authorized user");
                }
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
                    <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaUser className="sidebar-icon" />
                        <span className="sidebar-text">My Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaTachometerAlt className="sidebar-icon" />
                        <span className="sidebar-text">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaUsers className="sidebar-icon" />
                        <span className="sidebar-text">Users</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/teachers" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaChalkboardTeacher className="sidebar-icon" />
                        <span className="sidebar-text">Teachers</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/disciplines" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaBook className="sidebar-icon" />
                        <span className="sidebar-text">Disciplines</span>
                    </NavLink>
                </li>
            </ul>

            <div className="sidebar-logout">
                <NavLink to="/admin/logout" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    <FaSignOutAlt className="sidebar-icon" />
                    <span className="sidebar-text">Logout</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
