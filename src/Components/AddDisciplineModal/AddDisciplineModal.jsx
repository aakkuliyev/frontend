// src/Components/AddDisciplineModal/AddDisciplineModal.jsx
import React, { useState } from 'react';
import './AddDisciplineModal.css';

// простой fetch-helper, без хуков
function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('token');
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
}

function AddDisciplineModal({ isOpen, onClose, onSuccess }) {
    const [name, setName]       = useState('');
    const [msg, setMsg]         = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name.trim()) {
            setMsg('Name required');
            return;
        }
        setLoading(true);
        setMsg('');
        try {
            const res = await fetchWithToken('/api/v1/disciplines', {
                method: 'POST',
                body: JSON.stringify({ disciplineName: name.trim() }),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `Error ${res.status}`);
            }
            const dto = await res.json();
            onSuccess && onSuccess(dto);
            setName('');
        } catch (e) {
            setMsg(e.message || 'Error creating discipline');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add Discipline</h3>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Software Engineering"
                />
                {msg && <p className="modal-message">{msg}</p>}
                <div className="modal-buttons">
                    <button onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                    <button onClick={handleCreate} disabled={loading}>
                        {loading ? 'Adding…' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddDisciplineModal;
