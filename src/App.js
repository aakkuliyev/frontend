import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AdminLayout from "./Pages/AdminLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import AllTeachers from "./Pages/AllTeachers";
import DisciplinesPage from "./Pages/DisciplinesPage";
import LogoutPage from "./Pages/LogoutPage";
import TeacherProfilePage from "./Pages/TeacherProfile";
import MockPage from "./Pages/MockPage";
import TeacherDashboard from "./Pages/TeacherDashboard";
import MyDisciplines from "./Pages/MyDisciplines";
import MockDisciplines from "./Pages/MockDisciplines";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Главная страница */}
                <Route path="/" element={<AuthPage />} />

                {/* Админский блок */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="teachers" element={<AllTeachers />} />
                    <Route path="teachers/:id" element={<TeacherProfilePage />} />
                    <Route path="teachers/mock" element={<MockPage />} />
                    <Route path="disciplines" element={<DisciplinesPage />} />
                    <Route path="logout" element={<LogoutPage />} />
                </Route>

                {/* Teacher блок */}
                <Route path="/teacher">
                    <Route index element={<TeacherDashboard />} />
                    <Route path="disciplines" element={<MockDisciplines />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
