import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    FaSave,
    FaUser,
    FaEnvelope,
    FaMapMarkerAlt,
    FaIdCard,
    FaTags,
    FaShieldAlt,
    FaRegCalendarAlt,
} from "react-icons/fa";
import { Switch } from "@headlessui/react";
import "./TabPersonalInfo.css";

const TabPersonalInfo = ({ teacher, onUpdate }) => {
    const [formData, setFormData] = useState({});
    const [saved, setSaved] = useState(false);

    // initialize or update formData when teacher prop changes
    useEffect(() => {
        if (teacher) {
            setFormData({
                ...teacher,
                user: {
                    firstName: teacher.user?.firstName || "",
                    lastName: teacher.user?.lastName || "",
                    email: teacher.user?.email || "",
                    role: teacher.user?.role || "",
                },
                dateOfBirth: teacher.dateOfBirth ? new Date(teacher.dateOfBirth) : null,
            });
        }
    }, [teacher]);

    const fetchWithToken = (url, options = {}) => {
        const token = localStorage.getItem("token");
        return fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...(options.headers || {}),
            },
        });
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            user: { ...prev.user, [name]: value },
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                dateOfBirth: formData.dateOfBirth
                    ? formData.dateOfBirth.toISOString().slice(0, 10)
                    : null,
            };
            const response = await fetchWithToken(
                `/api/v1/teachers/${formData.teacherId}`,
                { method: "PUT", body: JSON.stringify(payload) }
            );

            if (!response.ok) {
                throw new Error(`Status ${response.status}`);
            }

            let updated = null;
            const text = await response.text();
            if (text) {
                updated = JSON.parse(text);
            }

            setSaved(true);
            onUpdate?.(updated);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error("Error saving personal info:", error);
        }
    };

    return (
        <div className="personal-info-wrapper">
            <form
                className="personal-info-form"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="form-grid">
                    {/* User fields */}
                    <div className="input-group">
                        <FaUser />
                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.user?.firstName || ""}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className="input-group">
                        <FaUser />
                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.user?.lastName || ""}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className="input-group">
                        <FaEnvelope />
                        <input
                            name="email"
                            placeholder="Email"
                            value={formData.user?.email || ""}
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className="input-group">
                        <FaShieldAlt />
                        <select
                            name="role"
                            value={formData.user?.role || ""}
                            onChange={handleUserChange}
                        >
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="TEACHER">Teacher</option>
                            <option value="USER">User</option>
                        </select>
                    </div>
                    {/* Personal fields */}
                    <div className="input-group">
                        <FaRegCalendarAlt />
                        <DatePicker
                            selected={formData.dateOfBirth}
                            onChange={(date) =>
                                setFormData((prev) => ({ ...prev, dateOfBirth: date }))
                            }
                            placeholderText="Date of Birth"
                            className="datepicker-input"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="input-group">
                        <FaMapMarkerAlt />
                        <input
                            name="placeOfBirth"
                            placeholder="Place of Birth"
                            value={formData.placeOfBirth || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <FaIdCard />
                        <input
                            name="militaryRank"
                            placeholder="Military Rank"
                            value={formData.militaryRank || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <FaTags />
                        <input
                            name="otherTitles"
                            placeholder="Other Titles"
                            value={formData.otherTitles || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <FaShieldAlt />
                        <input
                            name="criminalRecord"
                            placeholder="Criminal Record"
                            value={formData.criminalRecord || ""}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Switch */}
                    <div className="switch-group">
                        <label htmlFor="hasMedicalBook">Has Medical Book</label>
                        <Switch
                            checked={formData.hasMedicalBook || false}
                            onChange={(val) =>
                                setFormData((prev) => ({ ...prev, hasMedicalBook: val }))
                            }
                            className={
                                formData.hasMedicalBook ? "switch-on" : "switch-off"
                            }
                        >
                            <span className="sr-only">Medical Book</span>
                            <span className="slider" />
                        </Switch>
                    </div>
                </div>

                <button
                    type="button"
                    className="save-button"
                    onClick={handleSubmit}
                >
                    <FaSave /> Save
                </button>
                {saved && <p className="save-msg">Saved successfully ✅</p>}
            </form>
        </div>
    );
};

export default TabPersonalInfo;
