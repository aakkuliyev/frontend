import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./Pages/LoginSignUp";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AdminLayout from "./Pages/AdminLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import TeachersPage from "./Pages/TeachersPage";
import UsersPage from "./Pages/UsersPage";
import DisciplinesPage from "./Pages/DisciplinesPage";
import LogoutPage from "./Pages/LogoutPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Главная страница (логин/регистрация) */}
                <Route path="/" element={<LoginSignUp />} />

                {/* Все пути вида /admin/... */}
                <Route path="/admin" element={<AdminLayout />}>
                    {/* При заходе прямо на /admin будет показываться AdminDashboard */}
                    <Route path="dashboard" element={<AdminDashboard />} />

                    {/* /admin/teachers */}
                    <Route path="teachers" element={<TeachersPage />} />

                    {/* /admin/users */}
                    <Route path="users" element={<UsersPage />} />

                    {/* /admin/disciplines */}
                    <Route path="disciplines" element={<DisciplinesPage />} />

                    {/* /admin/logout */}
                    <Route path="logout" element={<LogoutPage />} />
                </Route>

                {/* Teacher */}
                <Route path="/teacher" element={<div>Welcome, teacher!</div>} />

                {/* Если путь не найден */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
