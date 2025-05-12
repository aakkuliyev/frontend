import React, { useEffect, useState, useCallback } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateTeacherModal from "../Components/QuickActions/СreateTeacherModal";
import "./CSS/TeachersPage.css";

const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("ru-RU", {
        day:   "2-digit",
        month: "2-digit",
        year:  "numeric",
    });
};

const AllTeachers = () => {
    const [search, setSearch]             = useState("");
    const [organization, setOrganization] = useState("");
    const [degree, setDegree]             = useState("");
    const [page, setPage]                 = useState(1);
    const size                            = 20;

    const [teachers, setTeachers]               = useState([]);
    const [organizations, setOrganizations]     = useState([]);
    const [degrees, setDegrees]                 = useState([]);
    const [totalPages, setTotalPages]           = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const navigate = useNavigate();

    // Helper fetch with token
    const fetchWithToken = useCallback((url) => {
        const token = localStorage.getItem("token");
        return fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    }, []);

    // Reset page when filters change
    useEffect(() => { setPage(1); }, [search, organization, degree]);

    // Load teachers
    const loadTeachers = useCallback(async () => {
        try {
            const params = new URLSearchParams({
                search,
                organization,
                degree,
                page: page - 1,
                size
            }).toString();

            const res = await fetchWithToken(`/api/v1/teachers?${params}`);
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Status ${res.status}: ${errText}`);
            }

            const data = await res.json();
            const list = Array.isArray(data) ? data : data.content;
            setTeachers(list);
            setTotalPages(data.totalPages ?? 1);
        } catch (err) {
            console.error("Error loading teachers:", err);
        }
    }, [search, organization, degree, page, fetchWithToken]);

    useEffect(() => { loadTeachers(); }, [loadTeachers]);

    // Load filter options
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [orgsRes, degsRes] = await Promise.all([
                    fetchWithToken("/api/v1/organizations"),
                    fetchWithToken("/api/v1/degrees/types")
                ]);
                if (orgsRes.ok) setOrganizations(await orgsRes.json());
                if (degsRes.ok) setDegrees(await degsRes.json());
            } catch (err) {
                console.error("Error loading filters:", err);
            }
        };
        loadFilters();
    }, [fetchWithToken]);

    const handleCreateSuccess = () => {
        setShowCreateModal(false);
        setPage(1);
    };

    return (
        <div className="teachers-container">
            <div className="teachers-header">
                <h2>All Teachers</h2>
                <button
                    className="invite-button"
                    onClick={() => setShowCreateModal(true)}
                >
                    Invite New Teacher
                </button>
            </div>

            <div className="filters">
                <input
                    placeholder="Search teachers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                >
                    <option value="">All Organizations</option>
                    {organizations.map((org, idx) => (
                        <option key={idx} value={org}>{org}</option>
                    ))}
                </select>
                <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                >
                    <option value="">All Academic Degrees</option>
                    {degrees.map((deg, idx) => (
                        <option key={idx} value={deg}>{deg}</option>
                    ))}
                </select>
            </div>

            <div className="cards">
                {teachers.map((t) => (
                    <div key={t.teacherId} className="teacher-card">
                        <div className="teacher-header">
                            <div className="avatar">{t.user.firstName[0]}</div>
                            <div>
                                <div className="name">{t.user.firstName} {t.user.lastName}</div>
                                <div className="email">{t.user.email}</div>
                            </div>
                        </div>
                        <div className="info">
                            <div><strong>Date of Birth:</strong> {formatDate(t.dateOfBirth)}</div>
                            <div><strong>Place of Birth:</strong> {t.placeOfBirth}</div>
                            <div><strong>Criminal Record:</strong> {t.criminalRecord}</div>
                            <div><strong>Military Rank:</strong> {t.militaryRank}</div>
                            <div><strong>Other Titles:</strong> {t.otherTitles}</div>
                        </div>
                        <div className="actions">
                            <button title="View" onClick={() => navigate(`/admin/teachers/${t.teacherId}`)}><Eye size={18} /></button>
                            <button title="Edit" onClick={() => navigate(`/admin/teachers/${t.teacherId}`)}><Pencil size={18} /></button>
                            <button title="Delete"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >Previous</button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={page === i + 1 ? "active" : ""}
                        onClick={() => setPage(i + 1)}
                    >{i + 1}</button>
                ))}
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                >Next</button>
            </div>

            {showCreateModal && (
                <CreateTeacherModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={handleCreateSuccess}
                />
            )}
        </div>
    );
};

export default AllTeachers;
