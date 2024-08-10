import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert("Logging you out!!");
    navigate('/');
  };

  const handleLoginRedirect = () => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    navigate('/login');
  };

  return (
    <header className="bg-black text-white p-4 shadow-md">
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
        <nav className="hidden lg:flex flex-grow items-center justify-end space-x-6">
          <Link to="/" className="text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            Home
          </Link>
          <Link to="/pricing" className="text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            Pricing
          </Link>
          <Link to="/contact" className="text-white px-4 py-2 rounded hover:bg-gray-700 transition">
            Contact
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
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
                  <Link to="/" className="text-white text-2xl" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-white text-2xl" onClick={toggleMenu}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white text-2xl" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
                {isLoggedIn ? (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="text-white text-2xl"
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
                      className="text-white text-2xl"
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
