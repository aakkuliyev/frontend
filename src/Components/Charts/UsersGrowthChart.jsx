// src/Components/Charts/UsersGrowthChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

// Регистрируем компоненты Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function UsersGrowthChart() {
    // Пример данных о количестве пользователей по месяцам
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Users",
                data: [50, 100, 180, 220, 300, 400], // Количество пользователей
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
                tension: 0.3, // сглаживание линии
                pointRadius: 4
            }
        ]
    };

    // Опции оформления графика
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: "User Growth Over Time"
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 50
                }
            }
        }
    };

    return (
        <div style={{ width: "100%", background: "#fff", padding: "1rem", borderRadius: "6px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default UsersGrowthChart;
