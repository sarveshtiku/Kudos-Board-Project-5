import React from 'react';

const AuthCard = ({ title, children }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      {children}
    </div>
  </div>
);

export default AuthCard;

