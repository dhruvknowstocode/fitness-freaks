// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
            <p className="text-sm mb-4">
                &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
            </p>
            <ul className="flex justify-center space-x-6">
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
