import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../components/logo.png';
import SearchBar from '../components/SearchBar.jsx';


function Header() {
  return (
    <>

      <header className="header">
        <div className="header-content">
          <div
            className="logo"
            onClick={() => window.location.reload()}
            style={{ cursor: 'pointer' }}
          >
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          <SearchBar />
           <div className="auth-buttons-overlay">
        <div className="auth-buttons">
          <Link to="/login">
            <button className="login-button">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
        </div>
      </div>
        </div>
      </header>
    </>
  );
}

export default Header;