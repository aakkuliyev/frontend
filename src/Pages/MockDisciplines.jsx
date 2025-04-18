import React, { useEffect, useState } from "react";
import "./CSS/MyDisciplines.css";
import { FaUserFriends, FaCalendarAlt, FaFlask, FaCogs, FaSearch } from "react-icons/fa";

const mockDisciplines = [
    {
        id: 1,
        name: "Mathematics",
        subtitle: "Advanced Calculus - Grade 12",
        days: "Mon, Wed",
        students: 28,
        icon: <FaFlask />,
    },
    {
        id: 2,
        name: "Physics",
        subtitle: "Mechanics - Grade 11",
        days: "Tue, Thu",
        students: 24,
        icon: <FaCogs />,
    },
    {
        id: 3,
        name: "Chemistry",
        subtitle: "Organic Chemistry - Grade 11",
        days: "Wed, Fri",
        students: 22,
        icon: <FaFlask />,
    },
];

const MyDisciplines = () => {
    const [disciplines, setDisciplines] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setDisciplines(mockDisciplines); // заменить позже на fetch
    }, []);

    const filtered = disciplines.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="my-disciplines-page">
            <div className="discipline-header">
                <h2>My Disciplines</h2>
                <div className="search-input">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search disciplines..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="discipline-list">
                {filtered.length === 0 ? (
                    <p className="no-results">No disciplines found.</p>
                ) : (
                    filtered.map((item) => (
                        <div className="discipline-card" key={item.id}>
                            <div className="discipline-icon">{item.icon}</div>
                            <div className="discipline-info">
                                <strong>{item.name}</strong>
                                <p>{item.subtitle}</p>
                                <div className="discipline-meta">
                                    <span><FaCalendarAlt /> {item.days}</span>
                                    <span><FaUserFriends /> {item.students} students</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyDisciplines;
