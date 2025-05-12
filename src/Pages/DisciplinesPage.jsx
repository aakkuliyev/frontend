import React, { useEffect, useState } from 'react';
import ManageTeachersModal from '../Components/ManageTeacherModal/ManageTeacherModal';
import AddDisciplineModal from '../Components/AddDisciplineModal/AddDisciplineModal';
import './CSS/DisciplinesPage.css';

// обычный helper, берёт токен и ставит заголовок
function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });
}

const DisciplinesPage = () => {
    const [disciplines, setDisciplines] = useState([]);
    const [selected, setSelected]       = useState(null);
    const [showAdd, setShowAdd]         = useState(false);

    // загрузка списка дисциплин
    const loadDisciplines = () => {
        fetchWithToken('/api/v1/disciplines')
            .then(res => {
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                return res.json();
            })
            .then(data => setDisciplines(data))
            .catch(err => console.error('Failed to load disciplines:', err));
    };

    useEffect(() => {
        loadDisciplines();
    }, []);

    // после успешного добавления
    const handleAddSuccess = () => {
        setShowAdd(false);
        loadDisciplines();
    };

    return (
        <div className="disciplines-page">
            <div className="disciplines-header">
                <h2>Discipline Management</h2>
                <button className="add-btn" onClick={() => setShowAdd(true)}>
                    + Add Discipline
                </button>
            </div>

            <div className="disciplines-list">
                {disciplines.map(d => (
                    <div key={d.disciplineId} className="discipline-card">
                        <div className="discipline-info">
                            <strong>{d.disciplineName}</strong>
                        </div>
                        <div className="discipline-actions">
                            <button onClick={() => setSelected(d)}>
                                Manage Teachers
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selected && (
                <ManageTeachersModal
                    discipline={selected}
                    onClose={() => {
                        setSelected(null);
                        loadDisciplines();
                    }}
                />
            )}

            {showAdd && (
                <AddDisciplineModal
                    isOpen={showAdd}
                    onClose={() => setShowAdd(false)}
                    onSuccess={handleAddSuccess}
                />
            )}
        </div>
    );
};

export default DisciplinesPage;
