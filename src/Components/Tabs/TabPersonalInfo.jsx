import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSave, FaUser, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaShieldAlt, FaRegCalendarAlt, FaTags } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import "./TabPersonalInfo.css";

const TabPersonalInfo = ({ teacher }) => {
    const [formData, setFormData] = useState({
        ...teacher,
        dateOfBirth: teacher.dateOfBirth ? new Date(teacher.dateOfBirth) : null,
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        const user = { ...formData.user, [name]: value };
        setFormData((prev) => ({ ...prev, user }));
    };

    const handleSubmit = () => {
        const payload = {
            ...formData,
            dateOfBirth: formData.dateOfBirth?.toISOString().slice(0, 10),
        };

        fetch(`/api/v1/teachers/${formData.teacherId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then(() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            })
            .catch(console.error);
    };

    return (
        <div className="personal-info-wrapper">
            <form className="personal-info-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-grid">
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
                        <FaRegCalendarAlt />
                        <DatePicker
                            selected={formData.dateOfBirth}
                            onChange={(date) => setFormData((prev) => ({ ...prev, dateOfBirth: date }))}
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

                    <div className="switch-group">
                        <label>Has Medical Book</label>
                        <Switch
                            checked={formData.hasMedicalBook || false}
                            onChange={(val) => setFormData((prev) => ({ ...prev, hasMedicalBook: val }))}
                            className={`${formData.hasMedicalBook ? "switch-on" : "switch-off"}`}
                        >
                            <span className="sr-only">Medical Book</span>
                            <span className="slider" />
                        </Switch>
                    </div>
                </div>

                <button type="button" className="save-button" onClick={handleSubmit}>
                    <FaSave /> Save
                </button>
                {saved && <p className="save-msg">Saved successfully ✅</p>}
            </form>
        </div>
    );
};

export default TabPersonalInfo;
