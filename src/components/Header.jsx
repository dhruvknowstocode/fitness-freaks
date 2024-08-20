import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaPhone } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuthStatus();  // Initial check on mount
  }, []);

  useEffect(() => {
    // Check auth status whenever the component is re-rendered
    checkAuthStatus();
  }, [navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Update state to reflect logout
    alert("Logging you out!!");
    navigate('/');
  };

  const handleLoginRedirect = () => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    navigate('/login');
  };

  return (
    <header className="bg-black text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Site Title */}
        <Link to="/" className="text-3xl font-bold">
          Fitness Tracker
        </Link>

        {/* Hamburger Icon */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-grow items-center justify-end space-x-8">
          <Link to="/" className="text-white text-lg font-semibold flex items-center hover:bg-gray-700 px-4 py-2 rounded transition">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/dashboard" className="text-white text-lg font-semibold flex items-center hover:bg-gray-700 px-4 py-2 rounded transition">
            <FaUser className="mr-2" /> Dashboard
          </Link>
          <Link to="/contact" className="text-white text-lg font-semibold flex items-center hover:bg-gray-700 px-4 py-2 rounded transition">
            <FaPhone className="mr-2" /> Contact
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white text-lg font-semibold flex items-center hover:bg-gray-700 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="text-white text-lg font-semibold flex items-center hover:bg-gray-700 px-4 py-2 rounded transition"
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className={`fixed inset-0 bg-black bg-opacity-80 z-50 lg:hidden transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-2xl">
              <FaTimes />
            </button>
            <nav className="mt-12 w-full">
              <ul className="flex flex-col space-y-6 items-center">
                <li>
                  <Link to="/" className="text-white text-2xl font-semibold flex items-center" onClick={toggleMenu}>
                    <FaHome className="mr-2" /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-white text-2xl font-semibold flex items-center" onClick={toggleMenu}>
                    <FaUser className="mr-2" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white text-2xl font-semibold flex items-center" onClick={toggleMenu}>
                    <FaPhone className="mr-2" /> Contact
                  </Link>
                </li>
                {isLoggedIn ? (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="text-white text-2xl font-semibold flex items-center"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      onClick={() => {
                        handleLoginRedirect();
                        toggleMenu();
                      }}
                      className="text-white text-2xl font-semibold flex items-center"
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
