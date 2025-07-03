import React from "react";
import "./BoardCard.css";

const BoardCard = ({ board }) => {
  const { title, description, category, image, author, createdAt } = board;
  return (
    <div className="board-card">
      {author?.name && <div className="board-author">By {author.name}</div>}
      <img src={image} alt={title} className="board-image" />
      <div className="board-content">
        <h2 className="board-title">{title}</h2>
        <p className="board-category">{category}</p>
        {description && <p className="board-description">{description}</p>}
        <div className="board-footer">
          {/* <div className="board-actions">
            <button onClick={(e) => e.stopPropagation()}>Repost</button>
            <button onClick={(e) => e.stopPropagation()}>Like</button>
            <button onClick={(e) => e.stopPropagation()}>Save</button>
          </div> */}
          {/* {author?.name && <span className="board-author">By {author.name}</span>} */}
          <span className="board-date">{new Date(createdAt).toLocaleDateString()}</span>
        </div> 
      </div>
    </div>
  );
};

export default BoardCard;