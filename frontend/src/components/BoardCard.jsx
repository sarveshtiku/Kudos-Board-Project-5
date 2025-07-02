 
import React from "react";
import "./BoardCard.css";

const BoardCard = ({ title, description, category, image, authorName, createdAt }) => {
  return (
    <div className="board-card">
      <img src={image} alt={title} className="board-image" />
      <div className="board-content">
        <h2 className="board-title">{title}</h2>
        <p className="board-category">{category}</p>
        {description && <p className="board-description">{description}</p>}
        <div className="board-footer">
          {authorName && <span className="board-author">By {authorName}</span>}
          <span className="board-date">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;