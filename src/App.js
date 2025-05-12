import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AuthPage from "./Pages/AuthPage";
import AdminLayout from "./Pages/AdminLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import AllTeachers from "./Pages/AllTeachers";
import TeacherProfilePage from "./Pages/TeacherProfile";
import DisciplinesPage from "./Pages/DisciplinesPage";
import LogoutPage from "./Pages/LogoutPage";
import TeacherDashboard from "./Pages/TeacherDashboard";
import MockDisciplines from "./Pages/MockDisciplines";
import ReportPage from "./Pages/ReportPage";

// Проверяет наличие токена
const RequireAuth = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/" replace />;
};

// Проверяет роль пользователя внутри токена
const RequireRole = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/" replace />;

    let role;
    try {
        const decoded = jwtDecode(token);
        role = decoded.role;
    } catch {
        return <Navigate to="/" replace />;
    }

    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Public route */}
                <Route path="/" element={<AuthPage />} />

                {/* Protected admin routes */}
                <Route element={<RequireAuth /> }>
                    <Route element={<RequireRole allowedRoles={["ADMIN"]} /> }>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="teachers" element={<AllTeachers />} />
                            <Route path="teachers/:id" element={<TeacherProfilePage />} />
                            <Route path="disciplines" element={<DisciplinesPage />} />
                            <Route path="reports" element={<ReportPage />} />
                            <Route path="logout" element={<LogoutPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* Protected teacher routes */}
                <Route element={<RequireAuth /> }>
                    <Route element={<RequireRole allowedRoles={["TEACHER"]} /> }>
                        <Route path="/teacher">
                            <Route index element={<TeacherDashboard />} />
                            <Route path="disciplines" element={<MockDisciplines />} />
                            <Route path="logout" element={<LogoutPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;