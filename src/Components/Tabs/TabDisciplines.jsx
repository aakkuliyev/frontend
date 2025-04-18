import React, { useEffect, useState } from "react";
import "./TabAcademic.css";

const TabDisciplines = ({ teacherId }) => {
    const [allDisciplines, setAllDisciplines] = useState([]);
    const [teacherDisciplines, setTeacherDisciplines] = useState([]);

    const fetchDisciplines = () => {
        fetch(`/api/v1/disciplines`)
            .then(res => res.json())
            .then(setAllDisciplines);
    };

    const fetchTeacherDisciplines = () => {
        fetch(`/api/v1/teachers/${teacherId}/disciplines`)
            .then(res => res.json())
            .then(setTeacherDisciplines);
    };

    /*useEffect(() => {
        fetchDisciplines();
        fetchTeacherDisciplines();
    }, []);*/

    useEffect(() => {
        const mockAll = [
            { disciplineId: 1, disciplineName: "Algorithms" },
            { disciplineId: 2, disciplineName: "Databases" },
            { disciplineId: 3, disciplineName: "Operating Systems" }
        ];

        const mockAssigned = [
            { disciplineId: 1, disciplineName: "Algorithms" },
            { disciplineId: 2, disciplineName: "Databases" }
        ];

        setAllDisciplines(mockAll);
        setTeacherDisciplines(mockAssigned);
    }, []);


    const addDiscipline = (disciplineId) => {
        fetch(`/api/v1/teachers/${teacherId}/disciplines`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teacherId, disciplineId })
        }).then(fetchTeacherDisciplines);
    };

    const removeDiscipline = (disciplineId) => {
        fetch(`/api/v1/teachers/${teacherId}/disciplines/${disciplineId}`, {
            method: "DELETE"
        }).then(fetchTeacherDisciplines);
    };

    return (
        <div className="academic-tab">
            <h4>Assigned Disciplines</h4>
            <div className="academic-list">
                {teacherDisciplines.map((d) => (
                    <div key={d.disciplineId} className="academic-card">
                        {d.disciplineName}
                        <button onClick={() => removeDiscipline(d.disciplineId)}>🗑️</button>
                    </div>
                ))}
            </div>

            <h4>Available Disciplines</h4>
            <div className="academic-list">
                {allDisciplines
                    .filter(d => !teacherDisciplines.some(td => td.disciplineId === d.disciplineId))
                    .map(d => (
                        <div key={d.disciplineId} className="academic-card">
                            {d.disciplineName}
                            <button onClick={() => addDiscipline(d.disciplineId)}>➕</button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TabDisciplines;
