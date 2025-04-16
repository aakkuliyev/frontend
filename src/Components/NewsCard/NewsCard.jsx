import React from "react";
import "./NewsCard.css";

function NewsCard({ title, date, imageUrl, description }) {
    return (
        <div className="news-card">
            <div className="news-card-image">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="news-card-content">
                <h3 className="news-card-title">{title}</h3>
                <p className="news-card-date">{date}</p>
                <p className="news-card-description">{description}</p>
            </div>
        </div>
    );
}

export default NewsCard;
