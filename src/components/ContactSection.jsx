import React from 'react';
import { Link } from 'react-router-dom';

const ContactSection = () => (
  <section id="contact" className="bg-gray-200 py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Contact Us</h2>
      <p className="text-lg mb-8 text-gray-600">
        If you have any questions or need support, feel free to reach out to us. We're here to help!
      </p>
      <Link to="/contact" className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105">
        Get in Touch
      </Link>
    </div>
  </section>
);

export default ContactSection;
