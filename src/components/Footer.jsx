// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
            </p>
            <ul className="flex justify-center space-x-4 mt-2">
                <li>
                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
    </footer>
);

export default Footer;
