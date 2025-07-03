import React from "react";
import "./BoardCard.css";

const DEFAULT_IMAGE = "/logo.png"; // fallback image in public/

const BoardCard = ({ board, onDelete, onView, currentUserId }) => {
  const { id, title, description, category, image, author, authorId, createdAt } = board;
  // Only show delete if the logged-in user owns the board
const isOwner = currentUserId && ((authorId && authorId === currentUserId) || (author && author.id === currentUserId));
  return (
    <div
      className="board-card"
      onClick={() => onView(board)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Show author name if present */}
      {author?.name && <div className="board-author">By {author.name}</div>}
      {/* Board image with fallback */}
      <img
        src={image || DEFAULT_IMAGE}
        alt={title}
        className="board-image"
        onError={e => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE; }}
      />
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
          <span className="board-date">{createdAt ? new Date(createdAt).toLocaleDateString() : ''}</span>
        </div> 
      </div>
      {/* Only show delete button for owner */}
      {isOwner && (
        <button
          className="delete-btn"
          style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 2 }}
          onClick={e => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          🗑️
        </button>
      )}
    </div>
  );
};

export default BoardCard;
