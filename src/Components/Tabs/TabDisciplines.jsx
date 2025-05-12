// src/Components/Tabs/TabDisciplines.jsx
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TabAcademic.css";

const TabDisciplines = ({ teacherId }) => {
    const [allDisciplines, setAllDisciplines] = useState([]);
    const [assigned, setAssigned]             = useState([]);
    const [loading, setLoading]               = useState(true);

    // Fetch helper with token
    const fetchWithToken = (url, opts = {}) => {
        const token = localStorage.getItem("token");
        return fetch(url, {
            ...opts,
            headers: {
                ...(opts.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        });
    };

    // Load both lists
    const loadAll = async () => {
        const res = await fetchWithToken("/api/v1/disciplines");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setAllDisciplines(await res.json());
    };
    const loadAssigned = async () => {
        const res = await fetchWithToken(
            `/api/v1/teachers/${teacherId}/disciplines`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setAssigned(await res.json());
    };

    useEffect(() => {
        if (!teacherId) return;
        setLoading(true);
        Promise.all([loadAll(), loadAssigned()])
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [teacherId]);

    // On drag end: if dropped from available → assigned, call POST; reverse → DELETE.
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination || destination.droppableId === source.droppableId) return;

        const discId = parseInt(draggableId, 10);
        try {
            if (source.droppableId === "available" && destination.droppableId === "assigned") {
                await fetchWithToken(
                    `/api/v1/teachers/${teacherId}/disciplines`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ disciplineId: discId }),
                    }
                );
            } else if (
                source.droppableId === "assigned" &&
                destination.droppableId === "available"
            ) {
                await fetchWithToken(
                    `/api/v1/teachers/${teacherId}/disciplines/${discId}`,
                    { method: "DELETE" }
                );
            }
            // reload assigned list
            await loadAssigned();
        } catch (err) {
            console.error("Ошибка при изменении дисциплины:", err);
        }
    };

    if (loading) return <div>Loading disciplines…</div>;

    // compute available = all minus assigned
    const available = allDisciplines.filter(
        (d) => !assigned.some((a) => a.disciplineId === d.disciplineId)
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="academic-tab two-columns">
                <Droppable droppableId="assigned">
                    {(provided) => (
                        <div
                            className="column"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h4>Assigned</h4>
                            {assigned.length === 0 && <div>None</div>}
                            {assigned.map((d, idx) => (
                                <Draggable
                                    key={d.disciplineId}
                                    draggableId={`${d.disciplineId}`}
                                    index={idx}
                                >
                                    {(p) => (
                                        <div
                                            className="academic-card"
                                            ref={p.innerRef}
                                            {...p.draggableProps}
                                            {...p.dragHandleProps}
                                        >
                                            {d.disciplineName}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="available">
                    {(provided) => (
                        <div
                            className="column"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h4>Available</h4>
                            {available.map((d, idx) => (
                                <Draggable
                                    key={d.disciplineId}
                                    draggableId={`${d.disciplineId}`}
                                    index={idx}
                                >
                                    {(p) => (
                                        <div
                                            className="academic-card"
                                            ref={p.innerRef}
                                            {...p.draggableProps}
                                            {...p.dragHandleProps}
                                        >
                                            {d.disciplineName}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default TabDisciplines;
