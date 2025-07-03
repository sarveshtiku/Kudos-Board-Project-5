import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>✨ Made with love by the TechStyle Team ✨</p>
        <p>&copy; {new Date().getFullYear()} Noted. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;