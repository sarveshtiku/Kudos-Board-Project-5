import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardCard from '../components/BoardCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Individual Card Component
const Card = ({ card, isAuthenticated, onPin, onDelete, onComment, onLike }) => {
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

  const handleLike = () => {
    if (!isAuthenticated) {
      alert('Please sign in to like cards');
      window.location.href = '/login';
      return;
    }
    onLike(card.id);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fef2ff, #e5f0ff)',
        borderRadius: '28px',
        boxShadow: '0 12px 32px rgba(200, 180, 255, 0.3), 0 2px 8px rgba(180, 180, 255, 0.15)',
        padding: '2rem',
        margin: '0',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        minHeight: '360px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '2px solid #f8e8ff',
        fontFamily: '"Comic Sans MS", "Poppins", cursive, sans-serif',
        color: '#5c4f8a',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.025)';
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(200, 180, 255, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(200, 180, 255, 0.3), 0 2px 8px rgba(180, 180, 255, 0.15)';
      }}
    >
      {card.pinned && (
        <div style={{
          position: 'absolute',
          top: '14px',
          right: '18px',
          backgroundColor: '#ffd700',
          padding: '4px 12px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 2px 8px #ffe06655'
        }}>
          📌 Pinned
        </div>
      )}

      {card.gif && (
        <img
          src={card.gif}
          alt="Card GIF"
          style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain', borderRadius: '12px', marginBottom: '0.75rem' }}
        />
      )}

      <p style={{ margin: '0.5rem 0', fontSize: '1.1rem', color: '#5c5c8a', fontWeight: 500, flexGrow: 1 }}>{card.message}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
        {isAuthenticated && (
          <button
            onClick={handlePin}
            style={{
              background: card.pinned ? 'linear-gradient(90deg, #ffe066 80%, #fffbe6)' : '#f0f0f7',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              color: card.pinned ? '#7a6000' : '#5c5c8a',
              boxShadow: card.pinned ? '0 2px 8px #ffe06655' : 'none',
              transition: 'background 0.2s'
            }}
          >
            📌 {card.pinned ? 'Unpin' : 'Pin'}
          </button>
        )}

        {isAuthenticated && (
          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              background: 'linear-gradient(90deg, #e0eaff 80%, #f6f7ff)',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              color: '#5c5c8a',
              transition: 'background 0.2s'
            }}
          >
            💬 {card.comments?.length || 0}
          </button>
        )}

      <button
  onClick={handleLike}
  disabled={!isAuthenticated}
  style={{
    background: card.liked
      ? 'linear-gradient(90deg, #ffd6eb 80%, #ffe6f2)'
      : 'linear-gradient(90deg, #f0f0f0 80%, #fefefe)',
    border: 'none',
    padding: '7px 16px',
    borderRadius: '8px',
    cursor: isAuthenticated ? 'pointer' : 'not-allowed',
    fontWeight: 600,
    color: card.liked ? '#d63384' : '#888',
    boxShadow: card.liked ? '0 2px 6px #f3c4ff66' : 'none'
  }}
>
  {card.liked ? '💗' : '🤍'} {card.upvotes}
</button>
        {isAuthenticated && (
          <button
            onClick={handleDelete}
            style={{
              background: 'linear-gradient(90deg, #ffb3b3 80%, #ffeaea)',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#a21818',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
          >
            🗑️
          </button>
        )}
      </div>

      {showComments && (
        <div style={{ marginTop: '1.2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {card.comments?.map(comment => (
              <div key={comment.id} style={{ marginBottom: '0.5rem', fontSize: '13px', color: '#5c5c8a' }}>
                <strong>{comment.author?.name || 'Anonymous'}:</strong> {comment.message}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '0.7rem', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{
                flex: 1,
                padding: '6px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '13px'
              }}
            />
            <button
              onClick={handleComment}
              style={{
                background: 'linear-gradient(90deg, #aee6ae 80%, #eaffea)',
                color: '#236e23',
                border: 'none',
                padding: '6px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Post
            </button>
          </div>
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
              alt= "addcard" type="button"
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
  const handleLikeCard = async (cardId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/cards/${cardId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const updated = await response.json();
setCards(prev =>
  prev.map(card =>
    card.id === cardId
      ? {
          ...card,
          upvotes: updated.upvotes,
          liked: updated.liked
        }
      : card
  )
);
      }
    } catch (error) {
      console.error('Error liking card:', error);
    }
  };
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef6ff, #e0f7fa)',
      fontFamily: '"Poppins", sans-serif',
      color: '#444'
    }}>
      <Header />
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '150px' }}>
          <main style={{ padding: '2rem' }}>
            {board && (
              <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '2rem' }}>
                {board.imageUrl && (
                  <img 
                    src={board.imageUrl}
                    alt="Board"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      marginBottom: '1.5rem'
                    }}
                  />
                )}
                <h1 style={{ fontSize: '2.5rem', color: '#6a4c93', marginBottom: '0.5rem' }}>{board.title}</h1>
                <p style={{ color: '#888', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>{board.description}</p>
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ 
                    background: '#fff5fc', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px',
                    marginRight: '1rem',
                    border: '1px solid #f8daf8'
                  }}>
                    {board.category}
                  </span>
                  <span style={{ fontSize: '14px', color: '#999' }}>
                    {isAuthenticated ? `Welcome, ${user?.name || user?.email}!` : 'Browsing as guest'}
                  </span>
                </div>
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #ffe6ff, #d0f0ff)',
                  color: '#5c5c8a',
                  border: '2px solid #fceaff',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: '"Poppins", sans-serif',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  letterSpacing: '0.5px',
                  textShadow: '1px 1px 2px #ffffffaa'
                }}
              >
                + Add Card ✨
              </button>
            </div>
            
            {allCards.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h3 style={{ color: '#888' }}>No cards yet 🫧</h3>
                <p style={{ color: '#999' }}>Be the first to add a card to this board.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
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
                    onLike={handleLikeCard}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
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