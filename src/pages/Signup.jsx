import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Footer from '../components/Footer';
import Header from '../components/Header';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // State to manage spinner visibility

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true); // Show spinner

    try {
      const response = await fetch('https://fitness-freaks-wuyi.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to the login page upon successful signup
        alert("Successfully signed up!!");
        navigate('/login');
      } else {
        // Handle errors (e.g., display error message)
        console.log('Signup failed.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-16 bg-gray-50 max-w-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-800 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-800 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="block text-gray-800 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-800 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {loading && <div className="spinner mt-4"></div>} {/* Display spinner while loading */}
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </main>
  );
};

export default Signup;
