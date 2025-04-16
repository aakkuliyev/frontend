import React, { useState } from "react";
import "./QuickActions.css";
import { FaPlusCircle, FaUserPlus, FaFileAlt } from "react-icons/fa";
import AssignDisciplineModal from "./AssignDisciplineModal";
import CreateTeacherModal from "./СreateTeacherModal";

function QuickActions() {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showCreateTeacherModal, setShowCreateTeacherModal] = useState(false);

    const actions = [
        {
            id: 1,
            label: "Add New Discipline",
            icon: <FaPlusCircle />,
            onClick: () => setShowAssignModal(true)
        },
        {
            id: 2,
            label: "Invite New Teacher",
            icon: <FaUserPlus />,
            onClick: () => setShowCreateTeacherModal(true)
        },
        {
            id: 3,
            label: "Generate Report",
            icon: <FaFileAlt />,
            onClick: () => alert("Generate report action")
        }
    ];

    return (
        <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
                {actions.map((action) => (
                    <div key={action.id} className="action-item" onClick={action.onClick}>
                        <div className="action-icon">{action.icon}</div>
                        <div className="action-label">{action.label}</div>
                    </div>
                ))}
            </div>

            {/* Модалки */}
            <AssignDisciplineModal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} />
            <CreateTeacherModal isOpen={showCreateTeacherModal} onClose={() => setShowCreateTeacherModal(false)} />
        </div>
    );
}

export default QuickActions;
