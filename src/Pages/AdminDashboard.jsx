// src/Pages/AdminDashboard.jsx
import React from "react";
import News from "../Components/News/News";
import "./CSS/AdminDashboard.css";
import StatsCard from "../Components/StatsCard/StatsCard";
import UsersGrowthChart from "../Components/Charts/UsersGrowthChart";
import CoursesPieChart from "../Components/Charts/CoursesPieChart";
import RecentActivity from "../Components/RecentActivity/RecentActivity";
import QuickActions from "../Components/QuickActions/QuickActions";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            {/* Блок быстрых статистик (Cards) */}
            <div className="stats-container">
                <StatsCard title="Total Teachers" value="45" />
                <StatsCard title="Total Students" value="230" />
                <StatsCard title="Active Users Today" value="7" />
                <StatsCard title="Active Courses" value="6" />
            </div>

            {/* Графики/Диаграммы */}
            <div className="charts-container">
                <UsersGrowthChart />
                <CoursesPieChart />
            </div>

            {/* Последние новости или события */}
            <News />

            {/* Список активности или уведомления */}
            <RecentActivity />

            {/* Быстрые ссылки */}
            <QuickActions />
        </div>
    );
}

export default AdminDashboard;
