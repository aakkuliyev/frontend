import React, { useEffect, useState } from "react";
import "./CSS/DisciplinesPage.css";
import ManageTeachersModal from "../Components/ManageTeacherModal/ManageTeacherModal";
import AddDisciplineModal from "../Components/AddDisciplineModal/AddDisciplineModal";

const mockDisciplines = [
    { id: 1, name: "Mathematics", assignedCount: 8 },
    { id: 2, name: "Computer Science", assignedCount: 5 },
    { id: 3, name: "Physics", assignedCount: 3 },
];

function DisciplinesPage() {
    const [disciplines, setDisciplines] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        // fetch('/api/v1/disciplines')
        //   .then(res => res.json())
        //   .then(data => setDisciplines(data))
        //   .catch(err => console.error("Failed to load disciplines:", err));
        setDisciplines(mockDisciplines);
    }, []);

    const handleOpenManage = (discipline) => {
        setSelectedDiscipline(discipline);
    };

    const handleCloseModal = () => {
        setSelectedDiscipline(null);
    };

    const handleAddSuccess = (newDiscipline) => {
        setDisciplines((prev) => [...prev, newDiscipline]);
    };

    return (
        <div className="disciplines-page">
            <div className="disciplines-header">
                <h2>Discipline Management</h2>
                <button className="add-btn" onClick={() => setShowAddModal(true)}>
                    + Add Discipline
                </button>
            </div>

            <div className="disciplines-list">
                {disciplines.map((d) => (
                    <div key={d.id} className="discipline-card">
                        <div className="discipline-info">
                            <strong>{d.name}</strong>
                            <span>{d.assignedCount} teachers assigned</span>
                        </div>
                        <div className="discipline-actions">
                            <button className="edit-btn">✎</button>
                            <button className="manage-btn" onClick={() => handleOpenManage(d)}>
                                Manage Teachers
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedDiscipline && (
                <ManageTeachersModal
                    discipline={selectedDiscipline}
                    onClose={handleCloseModal}
                />
            )}

            <AddDisciplineModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={handleAddSuccess}
            />
        </div>
    );
}

export default DisciplinesPage;
