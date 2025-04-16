// src/Pages/AdminLayout.jsx
import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./CSS/AdminLayout.css"; // ваши стили для лейаута (при необходимости)

export default class AdminLayout extends Component {
    render() {
        return (
            <div className="admin-layout">
                <Sidebar />
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        );
    }
}
