import React, { useEffect, useState } from 'react';
import BoardCard from '../components/BoardCard.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import logo from '../components/logo.png';
import './HomePage.css';

function HomePage() {
  const [boards, setBoards] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [newBoard, setNewBoard] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    author: ''
  });
  const [activeBoard, setActiveBoard] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);
'/api/boards'
'http:localhost'
  const fetchBoards = async () => {
    const response = await fetch('http://localhost:4000/api/boards');
    let data = await response.json();
    console.log(data);
    if (data.length === 0) {
      data = [{
        id: 'welcome',
        title: 'Welcome to Kudos!',
        description: 'Start your first kudos board by filling out the form below.',
        category: 'Welcome',
        author: 'System',
        image: 'https://media.giphy.com/media/3o7aCVpL3yLS5QfU4o/giphy.gif'
      }];
    }
    setBoards(data);
  };

  const handleSearch = () => {
    const filtered = boards.filter(board =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBoards(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    fetchBoards();
  };

  const handleFilter = (category) => {
    setFilter(category);
    if (category === 'All') {
      fetchBoards();
    } else if (category === 'Recent') {
      const recentBoards = [...boards]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      setBoards(recentBoards);
    } else {
      const filtered = boards.filter(board => board.category === category);
      setBoards(filtered);
    }
  };

  const handleInputChange = (e) => {
    setNewBoard({ ...newBoard, [e.target.name]: e.target.value });
  };

  const handleCreateBoard = async () => {
    const { title, category, description, image } = newBoard;
    if (!title || !category || !description || !image) {
      return alert('Title, Category, Description, and Image are required');
    }
    const response = await fetch('/api/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBoard),
    });
    const created = await response.json();
    setBoards(prev => [created, ...prev]);
    setUserBoards(prev => [created, ...prev]); // Add to user's boards
    setActiveBoard(created);
    setNewBoard({ title: '', category: '', description: '', image: '', author: '' });
  };

  const handleDeleteBoard = async (id) => {
    await fetch(`/api/boards/${id}`, { method: 'DELETE' });
    fetchBoards();
  };

  // Function to reload the page and reset all state
  const handleLogoClick = () => {
    window.location.reload();
  };
  if (!boards.length) {
    return <div>loading</div>
  }

  return (
    <div className="homepage">

      <Header onLogoClick={handleLogoClick} />

      <div className="filters">
        <button onClick={() => handleFilter('All')}>All</button>
        <button onClick={() => handleFilter('Recent')}>Recent</button>
        <select onChange={(e) => handleFilter(e.target.value)} defaultValue="">
          <option value="" disabled>Categories</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Cute">Cute</option>
          <option value="Cool">Cool</option>
          {[...new Set(boards.map(board => board.category))].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={() => setShowCreateModal(prev => !prev)}>
          + Create Board
        </button>
      </div>

      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="create-board">
              <input name="title" placeholder="Title*" value={newBoard.title} onChange={handleInputChange} />
              <input name="category" placeholder="Category*" value={newBoard.category} onChange={handleInputChange} />
              <input name="description" placeholder="Description*" value={newBoard.description} onChange={handleInputChange} />
              <input name="image" placeholder="Image URL*" value={newBoard.image} onChange={handleInputChange} />
              <input name="author" placeholder="Author" value={newBoard.author} onChange={handleInputChange} />
              <button onClick={handleCreateBoard}>Add Board</button>
            </div>
          </div>
        </div>
      )}

      <div className="board-grid">
        {boards.map(board => (
          <BoardCard key={board.id} board={board} onDelete={handleDeleteBoard} onClick={() => setActiveBoard(board)} />
        ))}
      </div>

      {userBoards.length > 0 && (
        <div className="user-board-list">
          <h2>Your Created Boards</h2>
          <div className="board-grid">
            {userBoards.map(board => (
              <BoardCard key={board.id} board={board} onDelete={handleDeleteBoard} onClick={() => setActiveBoard(board)} />
            ))}
          </div>
        </div>
      )}

      {activeBoard && (
        <div className="modal-backdrop" onClick={() => setActiveBoard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeBoard.image || 'placeholder.jpg'} alt={activeBoard.title} />
            <h3>{activeBoard.title}</h3>
            <p>{activeBoard.description}</p>
            <p><em>{activeBoard.author}</em></p>
            <button onClick={() => setActiveBoard(null)}>Close</button>
            <button onClick={() => {
              handleDeleteBoard(activeBoard.id);
              setActiveBoard(null);
            }}>Delete</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
