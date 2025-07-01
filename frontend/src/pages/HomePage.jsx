import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import jwt_decode from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Navigate } from 'react-router-dom';
   import SignUpPage from './SignUpPage';
   import LoginPage from './LoginPage';
   import ForgotPasswordPage from './ForgotPasswordPage';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
