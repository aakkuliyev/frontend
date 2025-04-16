// src/Pages/News.jsx
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./News.css"; // стили для списка карточек, если нужно

function News() {
    // Пример массива с данными о новостях
    const newsData = [
        {
            title: "4th-Year Students: Preparing for Thesis Defense",
            date: "08.04.2025",
            imageUrl: "https://picsum.photos/600/600?random=4",
            description:
                "Graduating students should finalize their thesis projects and coordinate pre-defense dates with their academic advisors. The final defense is scheduled for the end of May."
        },
        {
            title: "IITU Gains Premier Partner 2025 Status from Red Hat Academy!",
            date: "16.04.2025",
            imageUrl: "https://picsum.photos/600/600?random=1",
            description:
                "Red Hat Academy partners with educational institutions worldwide, providing a new generation of IT professionals with free access to a wide range of training courses and certification exams from Red Hat – the global leader in open-source solutions."
        },
        {
            title: "All Department Lecturers Must Submit Documents",
            date: "10.04.2025",
            imageUrl: "https://picsum.photos/600/600?random=3",
            description:
                "Dear lecturers, please remember to submit all necessary reports and documents to the dean's office by the end of April. The final deadline is May 1, 2025."
        },
        {
            title: "New Spring Boot Course Launched",
            date: "15.04.2025",
            imageUrl: "https://picsum.photos/600/600?random=2",
            description:
                "The new curriculum covers all aspects of building applications with Spring Boot, offering students hands-on experience in modern Java-based backend development."
        }
    ];


    return (
        <div className="news-page-container">
            <h2>News</h2>
            <div className="news-cards-container">
                {newsData.map((newsItem, index) => (
                    <NewsCard
                        key={index}
                        title={newsItem.title}
                        date={newsItem.date}
                        imageUrl={newsItem.imageUrl}
                        description={newsItem.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default News;
