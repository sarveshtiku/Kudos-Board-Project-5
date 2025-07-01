import React from 'react';

const GoogleSignInButton = ({ onClick, text = 'Sign in with Google' }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition"
    type="button"
  >
    <img
      src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google logo"
      className="w-5 h-5 mr-2"
    />
    {text}
  </button>
);

export default GoogleSignInButton;
