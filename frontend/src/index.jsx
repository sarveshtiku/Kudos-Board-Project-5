import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // your Tailwind imports

const container = document.getElementById('root');
if (!container) {
  throw new Error('No DOM element with id="root" found. Check your index.html!');
}
ReactDOM.createRoot(container).render(<App />);
