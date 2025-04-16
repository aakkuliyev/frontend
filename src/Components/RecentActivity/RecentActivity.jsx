// src/Components/RecentActivity/RecentActivity.jsx
import React from "react";
import "./RecentActivity.css";

function RecentActivity() {
    // Допустим, у вас есть массив последних действий:
    const activityData = [
        { id: 1, user: "admin@example.com", action: "Added new course: Math", date: "2025-04-10 10:15" },
        { id: 2, user: "teacher01@example.com", action: "Updated syllabus for Physics", date: "2025-04-10 09:50" },
        { id: 3, user: "admin@example.com", action: "Created new user: student05@example.com", date: "2025-04-09 14:20" },
    ];

    return (
        <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
                {activityData.map(item => (
                    <li key={item.id} className="activity-item">
                        <div className="activity-action">{item.action}</div>
                        <div className="activity-meta">
                            <span className="activity-user">{item.user}</span>
                            <span className="activity-date">{item.date}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentActivity;
