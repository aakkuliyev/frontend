// src/Components/Charts/CoursesPieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

// Регистрируем компоненты Chart.js для пироговой диаграммы
ChartJS.register(ArcElement, Tooltip, Legend);

function CoursesPieChart() {
    // Пример данных по распределению курсов
    const data = {
        labels: ["Math", "Computer Science", "Electronics", "Physics"],
        datasets: [
            {
                label: "Courses Distribution",
                data: [10, 25, 15, 8], // количество курсов
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)"
                ],
                borderWidth: 1
            }
        ]
    };

    // Опции оформления
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {
                display: true,
                text: "Distribution of Courses"
            }
        }
    };

    return (
        <div style={{ width: "100%", background: "#fff", padding: "1rem", borderRadius: "6px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <Pie data={data} options={options} />
        </div>
    );
}

export default CoursesPieChart;
