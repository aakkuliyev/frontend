import React, { useEffect, useState } from "react";
import "./CSS/TeachersPage.css";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



const allTeachers = [
    {
        teacherId: 1,
        user: {
            userId: 101,
            firstName: "Aibek",
            lastName: "Shynazbek",
            email: "aibek@iitu.kz"
        },
        dateOfBirth: "1999-01-01",
        placeOfBirth: "Almaty",
        criminalRecord: "None",
        hasMedicalBook: true,
        militaryRank: "Lieutenant",
        otherTitles: "Senior Lecturer",
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-03-12T12:00:00Z"
    },
    {
        teacherId: 2,
        user: {
            userId: 102,
            firstName: "Aruzhan",
            lastName: "Talgatova",
            email: "aruzhan@kaznu.kz"
        },
        dateOfBirth: "1992-05-14",
        placeOfBirth: "Shymkent",
        criminalRecord: "None",
        hasMedicalBook: false,
        militaryRank: "Captain",
        otherTitles: "Department Assistant",
        createdAt: "2023-09-01T09:30:00Z",
        updatedAt: "2024-03-15T11:20:00Z"
    },
    {
        teacherId: 3,
        user: {
            userId: 103,
            firstName: "Daniyar",
            lastName: "Rakhimov",
            email: "daniyar@satbayev.kz"
        },
        dateOfBirth: "1987-12-02",
        placeOfBirth: "Astana",
        criminalRecord: "No records",
        hasMedicalBook: true,
        militaryRank: "Major",
        otherTitles: "Head of Research",
        createdAt: "2022-07-20T08:15:00Z",
        updatedAt: "2024-01-05T10:45:00Z"
    },
    {
        teacherId: 4,
        user: {
            userId: 104,
            firstName: "Madina",
            lastName: "Nurmanova",
            email: "madina@kbtu.kz"
        },
        dateOfBirth: "1995-09-10",
        placeOfBirth: "Pavlodar",
        criminalRecord: "None",
        hasMedicalBook: true,
        militaryRank: "None",
        otherTitles: "",
        createdAt: "2024-02-11T11:00:00Z",
        updatedAt: "2024-03-01T14:22:00Z"
    },
    {
        teacherId: 5,
        user: {
            userId: 105,
            firstName: "Erzhan",
            lastName: "Tuleubekov",
            email: "erzhan@narxoz.kz"
        },
        dateOfBirth: "1985-11-03",
        placeOfBirth: "Aktobe",
        criminalRecord: "None",
        hasMedicalBook: false,
        militaryRank: "Sergeant",
        otherTitles: "Lecturer",
        createdAt: "2023-03-18T07:30:00Z",
        updatedAt: "2024-02-20T09:10:00Z"
    }
];


const AllTeachers = () => {
    const [search, setSearch] = useState("");
    const [organization, setOrganization] = useState("");
    const [degree, setDegree] = useState("");
    const [page, setPage] = useState(1);
    const size = 20;

    const [filtered, setFiltered] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        let result = [...allTeachers];

        // Поиск по имени
        result = result.filter((t) => {
            const firstName = t?.user?.firstName || "";
            const lastName = t?.user?.lastName || "";
            const fullName = `${firstName} ${lastName}`.toLowerCase();
            return fullName.includes(search.toLowerCase());
        });

        // Фильтр по организации
        if (organization) {
            result = result.filter((t) => (t.organization || "").toLowerCase() === organization.toLowerCase());
        }

        // Фильтр по академической степени
        if (degree) {
            result = result.filter((t) => (t.academicDegree || "").toLowerCase() === degree.toLowerCase());
        }

        setFiltered(result);
        setPage(1);
    }, [search, organization, degree]);


    const paginated = filtered.slice((page - 1) * size, page * size);
    const totalPages = Math.ceil(filtered.length / size);

    return (
        <div className="teachers-container">
            <div className="filters">
                <input
                    placeholder="Search teachers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
                    <option value="">All Organizations</option>
                    <option value="IITU">IITU</option>
                    <option value="KazNU">KazNU</option>
                    <option value="Satbayev">Satbayev</option>
                    <option value="KBTU">KBTU</option>
                    <option value="Narxoz">Narxoz</option>
                </select>
                <select value={degree} onChange={(e) => setDegree(e.target.value)}>
                    <option value="">All Academic Degrees</option>
                    <option value="PhD">PhD</option>
                    <option value="Master">Master</option>
                    <option value="Bachelor">Bachelor</option>
                </select>
            </div>

            <div className="cards">
                {paginated.map((t) => (
                    <div key={t.teacherId} className="teacher-card">
                        <div className="teacher-header">
                            <div className="avatar">{t.user.firstName[0]}</div>
                            <div>
                                <div className="name">{t.user.firstName} {t.user.lastName}</div>
                                <div className="email">{t.user.email}</div>
                            </div>
                        </div>
                        <div className="info">
                            <div><strong>Date of Birth:</strong> {t.dateOfBirth}</div>
                            <div><strong>Place of Birth:</strong> {t.placeOfBirth}</div>
                            <div><strong>Criminal Record:</strong> {t.criminalRecord}</div>
                            <div><strong>Military Rank:</strong> {t.militaryRank}</div>
                            <div><strong>Other Titles:</strong> {t.otherTitles}</div>
                        </div>
                        <div className="actions">
                            <button title="View" onClick={() => navigate("/admin/teachers/mock")}>
                                <Eye size={18} />
                            </button>
                            <button title="Edit"><Pencil size={18} /></button>
                            <button title="Delete"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={page === i + 1 ? "active" : ""}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllTeachers;
