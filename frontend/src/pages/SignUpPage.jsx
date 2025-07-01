import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function SignUpPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleSignup, setGoogleSignup] = useState(null); // { email, googleId, name }
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      let response, data;
      if (googleSignup) {
        // Complete Google sign-up
        response = await fetch('http://localhost:4000/api/auth/complete-google-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: googleSignup.email,
            googleId: googleSignup.googleId,
            name: googleSignup.name,
            username: form.username,
            password: form.password,
          }),
        });
        data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard';
        } else if (response.status === 409) {
          // User already exists, redirect to login
          navigate('/login');
        } else {
          setError(data.message || 'Sign up failed');
        }
      } else {
        // Normal sign-up
        response = await fetch('http://localhost:4000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        data = await response.json();
        if (response.ok) {
          setSuccess('Account created! Redirecting to login...');
          setTimeout(() => navigate('/login'), 1500);
        } else {
          setError(data.message || 'Sign up failed');
        }
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await fetch('http://localhost:4000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      const data = await response.json();
      if (data.needsUsername) {
        // Prefill email, prompt for username/password
        setGoogleSignup({ email: data.email, googleId: data.googleId, name: data.name });
        setForm(f => ({ ...f, email: data.email }));
        setError('');
        setSuccess('');
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Google sign up failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleGoogleError = () => {
    setError('Google sign up failed');
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
          Sign up for an account
        </h2>
        <form className="w-full flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              className="marketing-input"
              placeholder="Your username"
            />
          </div>
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
              value={form.email}
              onChange={handleChange}
              className="marketing-input"
              placeholder="you@example.com"
              disabled={!!googleSignup}
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={handleChange}
              className="marketing-input"
              placeholder="••••••••"
            />
          </div>
          {error && <div className="text-red-500 text-sm w-full text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm w-full text-center">{success}</div>}
          <button
            type="submit"
            className="marketing-button mt-2 w-full"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign up'}
          </button>
        </form>
        {!googleSignup && (
          <>
            <div className="w-full flex items-center my-6">
              <div className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                size="large"
                shape="pill"
                className="w-full flex justify-center p-0"
              />
            </div>
          </>
        )}
        <div className="mt-4 text-center w-full">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
}
