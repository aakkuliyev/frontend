// src/Components/StatsCard/StatsCard.jsx
import React from "react";
import "./StatsCard.css";

// При желании можно использовать иконку, передаваемую как prop (например, <FaUsers />).
// Пример использования: <StatsCard title="Total Teachers" value="15" icon={<FaChalkboardTeacher />} />

function StatsCard({ title, value, icon }) {
    return (
        <div className="stats-card">
            {/* Блок иконки (если не нужен – можно убрать) */}
            {icon && <div className="stats-card-icon">{icon}</div>}

            {/* Текстовые данные */}
            <div className="stats-card-info">
                <h3 className="stats-card-title">{title}</h3>
                <p className="stats-card-value">{value}</p>
            </div>
        </div>
    );
}

export default StatsCard;
