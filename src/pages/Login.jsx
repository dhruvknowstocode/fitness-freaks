import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for spinner
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    try {
      const response = await fetch('https://fitness-freaks-wuyi.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);
        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        alert('Login successful! Redirecting you to the previous page.');
        navigate(redirectPath); // Replace with your desired route
      } else {
        setError(data.msg || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="login-form w-full max-w-md">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="login-error">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Your Password"
              required
            />
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {loading && <div className="spinner"></div>} {/* Spinner */}
          <p className="text-gray-600 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
