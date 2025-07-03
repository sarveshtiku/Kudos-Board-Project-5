import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardCard from '../components/BoardCard.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import logo from '../components/logo.png';
import './HomePage.css';
import { getMyProfile } from '../api/apiService';

function HomePage() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const [userBoards, setUserBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [newBoard, setNewBoard] = useState({
    title: '', 
    category: '',
    description: '',
    image: ''
  });
  const [activeBoard, setActiveBoard] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Get logged-in user ID if available
    const token = localStorage.getItem('token');
    if (token) {
      getMyProfile(token).then(user => setCurrentUserId(user.id)).catch(() => setCurrentUserId(null));
    }
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/boards');
      let data = await response.json();
      if (data.length === 0) {
        data = [{
          id: 'welcome',
          title: 'Welcome to Kudos!',
          description: 'Start your first kudos board by filling out the form below.',
          category: 'Welcome',
          author: 'System',
          image: '/logo.png',
          createdAt: new Date().toISOString()
        }];
      }
      setBoards(data);
    } catch (error) {
      setBoards([{
        id: 'welcome',
        title: 'Welcome to Kudos!',
        description: 'Start your first kudos board by filling out the form below.',
        category: 'Welcome',
        author: 'System',
        image: '/logo.png',
        createdAt: new Date().toISOString()
      }]);
    }
  };

  const handleSearch = () => {
    const filtered = boards.filter(board =>
      board.title && board.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    const { title, category, description, image, author } = newBoard;
    if (!title || !category || !description || !image) {
      return alert('Title, Category, Description, and Image are required');
    }
    
    try {
      const response = await fetch('http://localhost:4000/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBoard),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create board: ${response.status}`);
      }
      
      const created = await response.json();
      setBoards(prev => [created, ...prev]);
      setUserBoards(prev => [created, ...prev]);
      setActiveBoard(created);
      setNewBoard({ title: '', category: '', description: '', image: '', author: '' });
      console.log('Board created:', created);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating board:', error);
      alert(`Failed to create board: ${error.message}`);
    }
  };

  const handleDeleteBoard = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:4000/api/boards/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!response.ok) {
        throw new Error(`Failed to delete board: ${response.status}`);
      }
      fetchBoards();
    } catch (error) {
      alert(`Failed to delete board: ${error.message}`);
    }
  };

  // Card click handler for navigation
  const handleViewBoard = (board) => {
    navigate(`/board/${board.id}`);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  if (!boards.length) {
    return <div>Loading...</div>;
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
          {[...new Set(boards.map(board => board.category))]
            .filter(category => !['s', 'e', 'happy', 'sad', 'Cute'].includes(category.toLowerCase()))
            .map(category => (
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
              <select name="category" value={newBoard.category} onChange={handleInputChange}>
                <option value="" disabled>Select Category*</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Cute">Cute</option>
                <option value="Cool">Cool</option>
                {[...new Set(boards.map(board => board.category))]
                  .filter(category => !['s', 'e', 'happy', 'sad'].includes(category.toLowerCase()))
                  .map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
              </select>
              <input name="description" placeholder="Description*" value={newBoard.description} onChange={handleInputChange} />
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewBoard(prev => ({ ...prev, image: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <input name="author" placeholder="Author" value={newBoard.author} onChange={handleInputChange} />
              <button onClick={handleCreateBoard}>Add Board</button>
            </div>
          </div>
        </div>
      )}
      <div className="board-grid">
        {boards.map(board => (
          <BoardCard
            key={board.id}
            board={board}
            onDelete={handleDeleteBoard}
            onView={() => navigate(`/boards/${board.id}`)}
            author={board.author}
          />
        ))}
      </div>
      {userBoards.length > 0 && (
        <div className="user-board-list">
          <h2>Your Created Boards</h2>
          <div className="board-grid">
            {userBoards.map(board => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={handleDeleteBoard}
                onView={() => navigate(`/boards/${board.id}`)}
                author={board.author}
              />
            ))}
          </div>
        </div>
      )}
      {activeBoard && (
        <div className="modal-backdrop" onClick={() => setActiveBoard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeBoard.image || '/logo.png'} alt={activeBoard.title} />
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
