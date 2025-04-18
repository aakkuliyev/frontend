import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaClock, FaFlask } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import "./CSS/MyDisciplines.css";

const MyDisciplines = () => {
    const [disciplines, setDisciplines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            const teacherId = decoded?.teacherId;
            if (teacherId) {
                // fetch(`/api/v1/teachers/${teacherId}/disciplines`)
                //   .then(res => res.json())
                //   .then(setDisciplines);

                const mockData = [
                    {
                        id: 1,
                        name: "Mathematics",
                        description: "Advanced Calculus - Grade 12",
                        schedule: "Mon, Wed",
                        students: 28,
                        icon: <FaChalkboardTeacher />
                    },
                    {
                        id: 2,
                        name: "Physics",
                        description: "Mechanics - Grade 11",
                        schedule: "Tue, Thu",
                        students: 24,
                        icon: <FaClock />
                    },
                    {
                        id: 3,
                        name: "Chemistry",
                        description: "Organic Chemistry - Grade 11",
                        schedule: "Wed, Fri",
                        students: 22,
                        icon: <FaFlask />
                    }
                ];
                setDisciplines(mockData);
            }
        } catch (e) {
            console.error("Token decode error", e);
        }
    }, []);

    const filtered = disciplines.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="my-disciplines-container">
            <div className="my-disciplines-header">
                <h2>My Disciplines</h2>
                <input
                    type="text"
                    placeholder="Search disciplines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="disciplines-grid">
                {filtered.map((d) => (
                    <div className="discipline-card" key={d.id}>
                        <div className="discipline-icon">{d.icon}</div>
                        <div className="discipline-info">
                            <strong>{d.name}</strong>
                            <p>{d.description}</p>
                            <div className="discipline-meta">
                                <span><FaClock /> {d.schedule}</span>
                                <span><FaUserGraduate /> {d.students} students</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDisciplines;