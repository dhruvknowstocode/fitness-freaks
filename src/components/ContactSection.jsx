// src/components/ContactSection.jsx
import React from 'react';

const ContactSection = () => (
  <section id="contact" className="bg-gray-100 py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
      <p className="text-lg mb-6">Get in touch with us for any questions or support.</p>
      <a href="/contact" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Contact Us</a>
    </div>
  </section>
);

export default ContactSection;
