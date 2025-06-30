// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccess = credentialResponse => {
    const user = jwt_decode(credentialResponse.credential);
    console.log('Google user:', user);
    // TODO: store token & redirect
  };
  const handleError = () => console.error('Login Failed');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: handle email/password login
    alert('Email/password login not implemented.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/60 backdrop-blur-md flex flex-col items-center justify-center">
        <img
          className="mx-auto h-12 w-auto mb-6"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Kudos Board"
        />
        <h2 className="mb-8 text-2xl font-bold text-gray-900 text-center w-full">
          Sign in to your account
        </h2>
        <form className="w-full flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="marketing-input"
              placeholder="you@example.com"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-semibold">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="marketing-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="marketing-button mt-2 w-full">
            Sign in
          </button>
        </form>
        <div className="w-full flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            size="large"
            shape="pill"
            className="w-full flex justify-center p-0"
          />
        </div>
      </div>
    </div>
  );
}