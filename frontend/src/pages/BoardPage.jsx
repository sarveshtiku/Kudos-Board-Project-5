import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import './BoardPage.css';

const API_BASE = 'http://localhost:4000/api';

const BoardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCard, setNewCard] = useState({ title: '', content: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBoardAndCards();
    // eslint-disable-next-line
  }, [id]);

  const fetchBoardAndCards = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch board details
      const boardRes = await fetch(`${API_BASE}/boards/${id}`);
      if (!boardRes.ok) throw new Error('Failed to fetch board');
      const boardData = await boardRes.json();
      setBoard(boardData);
      // Fetch cards for this board
      const cardsRes = await fetch(`${API_BASE}/boards/${id}/cards`);
      if (!cardsRes.ok) throw new Error('Failed to fetch cards');
      const cardsData = await cardsRes.json();
      setCards(cardsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    if (!newCard.title || !newCard.content) {
      alert('Title and content are required');
      return;
    }
    setCreating(true);
    try {
      const res = await fetch(`${API_BASE}/boards/${id}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });
      if (!res.ok) throw new Error('Failed to create card');
      const created = await res.json();
      setCards(prev => [created, ...prev]);
      setNewCard({ title: '', content: '' });
    } catch (err) {
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!board) return <div>Board not found</div>;

  return (
    <div className="board-page">
      <Header />
      <div className="board-detail-container">
        <button className="back-btn" onClick={() => navigate('/home')}>← Back to Home</button>
        <div className="board-detail">
          <img src={board.image || '/logo.png'} alt={board.title} className="board-image" />
          <h1>{board.title}</h1>
          <p className="board-category">{board.category}</p>
          <p className="board-description">{board.description}</p>
          <div className="board-meta">
            {board.author?.name && <span>By {board.author.name}</span>}
            <span>{board.createdAt ? new Date(board.createdAt).toLocaleDateString() : ''}</span>
          </div>
        </div>
        <div className="card-section">
          <h2>Cards</h2>
          <form className="create-card-form" onSubmit={handleCreateCard}>
            <input
              name="title"
              placeholder="Card Title*"
              value={newCard.title}
              onChange={handleInputChange}
              disabled={creating}
            />
            <textarea
              name="content"
              placeholder="Card Content*"
              value={newCard.content}
              onChange={handleInputChange}
              disabled={creating}
            />
            <button type="submit" disabled={creating}>Add Card</button>
          </form>
          <div className="card-list">
            {cards.length === 0 && <p>No cards yet. Be the first to add one!</p>}
            {cards.map(card => (
              <div key={card.id} className="card-tile">
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                <span className="card-date">{card.createdAt ? new Date(card.createdAt).toLocaleDateString() : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BoardPage;
