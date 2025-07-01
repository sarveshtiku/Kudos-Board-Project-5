import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('If an account with that email exists, a reset link has been sent.');
      } else {
        setError(data.message || 'Failed to send reset link');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
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
          Forgot Password
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
              placeholder="Enter your email"
            />
          </div>
          {error && <div className="text-red-500 text-sm w-full text-center">{error}</div>}
          <button
            type="submit"
            className="marketing-button mt-2 w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          {message && <div className="text-green-600 text-sm w-full text-center mt-2">{message}</div>}
        </form>
        <div className="mt-4 text-center w-full">
          <Link to="/login" className="text-blue-600 hover:underline block">Back to Login</Link>
          <Link to="/login" className="text-blue-600 hover:underline block mt-1">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
