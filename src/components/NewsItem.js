import React from 'react';
import './NewsItem.css';

const NewsItem = ({ title,description,link,image_url }) => {
    return (
        <div className="news-item">
            <h3>{title}</h3>
            <p>{description}</p>
            <h3>
                <a href={link}></a>
            </h3>
            <img className="news-img" src={image_url} alt="New Image" />
        </div>
    )
}
export default NewsItem;