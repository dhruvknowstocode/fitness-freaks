// src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => (
  <section
    id="hero"
    className="bg-gray-200 py-16 bg-cover bg-center"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      height: '60vh'
     }}
  >
    <div className="container mx-auto px-4 text-center bg-gray-800 bg-opacity-50 rounded-lg p-8">
      <h2 className="text-4xl font-bold text-white mb-4">Welcome to Fitness Tracker</h2>
      <p className="text-lg text-white mb-4">
        Track your fitness goals and stay motivated with our easy-to-use app. Whether you're looking to lose weight, build muscle, or just stay active, our app provides all the tools you need to succeed.
      </p>
      <a
        href="#features"
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
      >
        Get Started
      </a>
    </div>
  </section>
);

export default HeroSection;
