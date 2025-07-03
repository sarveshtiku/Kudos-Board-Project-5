import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardCard from '../components/BoardCard';

// Mock components - you can replace these with your actual components
const Header = () => (
  <header style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
    <h1>Kudos Board</h1>
  </header>
);

const Footer = () => (
  <footer style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderTop: '1px solid #ddd', marginTop: '2rem' }}>
    <p>© 2025 Kudos Board</p>
  </footer>
);

// Individual Card Component
const Card = ({ card, isAuthenticated, onPin, onDelete, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handlePin = () => {
    if (!isAuthenticated) {
      alert('Please sign in to pin cards');
      window.location.href = '/login';
      return;
    }
    onPin(card.id);
  };

  const handleDelete = () => {
    if (!isAuthenticated) {
      alert('Please sign in to delete cards');
      window.location.href = '/login';
      return;
    }
    onDelete(card.id);
  };

  const handleComment = () => {
    if (!isAuthenticated) {
      alert('Please sign in to comment');
      window.location.href = '/login';
      return;
    }
    if (newComment.trim()) {
      onComment(card.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {card.pinned && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          backgroundColor: '#ffd700',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          📌 Pinned
        </div>
      )}
      
      {card.gif && (
        <img 
          src={card.gif} 
          alt="Card GIF" 
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
        />
      )}
      
      <p style={{ margin: '0.5rem 0', fontSize: '14px' }}>{card.message}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button 
          onClick={handlePin}
          style={{
            background: card.pinned ? '#ffd700' : '#f0f0f0',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: isAuthenticated ? 'pointer' : 'not-allowed',
            opacity: isAuthenticated ? 1 : 0.5
          }}
        >
          📌 {card.pinned ? 'Unpin' : 'Pin'}
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          style={{
            background: '#f0f0f0',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          💬 {card.comments?.length || 0}
        </button>
        
        <span style={{ fontSize: '12px', color: '#666' }}>
          👍 {card.upvotes}
        </span>
        
        {isAuthenticated && (
          <button 
            onClick={handleDelete}
            style={{
              background: '#ff6b6b',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            🗑️
          </button>
        )}
      </div>
      
      {showComments && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {card.comments?.map(comment => (
              <div key={comment.id} style={{ marginBottom: '0.5rem', fontSize: '12px' }}>
                <strong>{comment.author?.name || 'Anonymous'}:</strong> {comment.message}
              </div>
            ))}
          </div>
          
          {isAuthenticated && (
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                style={{
                  flex: 1,
                  padding: '4px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              />
              <button
                onClick={handleComment}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Add Card Modal Component
const AddCardModal = ({ isOpen, onClose, onSubmit, isAuthenticated }) => {
  const [message, setMessage] = useState('');
  const [selectedGif, setSelectedGif] = useState('');
  const [gifSearch, setGifSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSubmit({
      message,
      gif: selectedGif,
      isGuest: !isAuthenticated
    });
    
    setMessage('');
    setSelectedGif('');
    setGifSearch('');
    setSearchResults([]);
    onClose();
  };

  const searchGifs = async () => {
    if (!gifSearch.trim()) return;
    
    setIsSearching(true);
    try {
      // Call your actual Giphy API endpoint
      const response = await fetch(`http://localhost:4000/api/cards/giphy/search?q=${encodeURIComponent(gifSearch)}`);
      if (response.ok) {
        const gifs = await response.json();
        // Transform to match the expected format
        const transformedGifs = gifs.map((gif, index) => ({
          id: index.toString(),
          images: {
            fixed_height: {
              url: gif.url
            }
          },
          title: gif.title
        }));
        setSearchResults(transformedGifs);
      } else {
        console.error('Failed to search GIFs');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching GIFs:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h2>Add New Card</h2>
        
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              style={{
                width: '100%',
                height: '100px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Search GIFs:</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={gifSearch}
                onChange={(e) => setGifSearch(e.target.value)}
                placeholder="Search for GIFs..."
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <button
                type="button"
                onClick={searchGifs}
                disabled={isSearching}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Select a GIF:</label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '0.5rem',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {searchResults.map(gif => (
                  <img
                    key={gif.id}
                    src={gif.images.fixed_height.url}
                    alt="GIF option"
                    onClick={() => setSelectedGif(gif.images.fixed_height.url)}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedGif === gif.images.fixed_height.url ? '3px solid #4CAF50' : '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

            {!isAuthenticated && (
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              padding: '0.5rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontSize: '14px'
            }}>
              ⚠️ Note: As a guest, your card will disappear when you refresh the page. 
              <a href="/login" style={{ color: '#007bff', textDecoration: 'underline' }}>
                Sign in
              </a> to save permanently.
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main BoardPage Component
const BoardPage = () => {
  const { id } = useParams();
  
  // State management
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [guestCards, setGuestCards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:4000/api/user/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Fetch board data
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/boards/${id}`);
        if (response.ok) {
          const boardData = await response.json();
          setBoard(boardData);
          setCards(boardData.cards || []);
        } else if (response.status === 404) {
          setError('Board not found');
        } else {
          setError('Failed to load board');
        }
      } catch (error) {
        console.error('Error fetching board:', error);
        setError('Failed to load board');
      }
    };
    
    if (id) {
      fetchBoard();
    }
  }, [id]);

  // Handlers
  const handleAddCard = async (cardData) => {
    if (cardData.isGuest) {
      // Add to guest cards (temporary)
      const newGuestCard = {
        id: Date.now(), // Temporary ID
        message: cardData.message,
        gif: cardData.gif,
        upvotes: 0,
        pinned: false,
        comments: [],
        author: { name: 'Guest' }
      };
      setGuestCards(prev => [...prev, newGuestCard]);
    } else {
      // Save to database
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/api/boards/${id}/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: cardData.message,
            gif: cardData.gif
          })
        });
        
        if (response.ok) {
          const newCard = await response.json();
          setCards(prev => [...prev, newCard]);
        } else {
          console.error('Failed to add card');
        }
      } catch (error) {
        console.error('Error adding card:', error);
      }
    }
  };

  const handlePinCard = async (cardId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/cards/${cardId}/pin`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setCards(prev => prev.map(card => 
          card.id === cardId ? { ...card, pinned: !card.pinned } : card
        ));
      }
    } catch (error) {
      console.error('Error pinning card:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setCards(prev => prev.filter(card => card.id !== cardId));
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleComment = async (cardId, comment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          cardId,
          message: comment
        })
      });
      
      if (response.ok) {
        const newComment = await response.json();
        setCards(prev => prev.map(card => 
          card.id === cardId 
            ? { ...card, comments: [...(card.comments || []), newComment] }
            : card
        ));
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Error: {error}</h2>
        <button onClick={() => window.location.href = '/'}>Go Back Home</button>
      </div>
    );
  }

  const allCards = [...cards, ...guestCards];
  const sortedCards = allCards.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      
      <main style={{ padding: '2rem' }}>
        {board && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1>{board.title}</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>{board.description}</p>
            <div style={{ marginTop: '1rem' }}>
              <span style={{ 
                background: '#e9ecef', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                marginRight: '1rem'
              }}>
                {board.category}
              </span>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {isAuthenticated ? `Welcome, ${user?.name || user?.email}!` : 'Browsing as guest'}
              </span>
            </div>
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            + Add Card
          </button>
        </div>
        
        {allCards.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ color: '#666' }}>No cards yet!</h3>
            <p style={{ color: '#999' }}>Be the first to add a card to this board.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            padding: '1rem'
          }}>
            {sortedCards.map(card => (
              <Card
                key={card.id}
                card={card}
                isAuthenticated={isAuthenticated}
                onPin={handlePinCard}
                onDelete={handleDeleteCard}
                onComment={handleComment}
              />
            ))}
          </div>
        )}
      </main>
      
      <AddCardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCard}
        isAuthenticated={isAuthenticated}
      />
      
      <Footer />
    </div>
  );
};

export default BoardPage;