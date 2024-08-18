import React from 'react';

const HeroSection = () => (
  <section
    id="hero"
    className="relative bg-cover bg-center"
    style={{ 
      backgroundImage: 'url(https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      height: 'calc(100vh - 4rem)'  // Adjust '4rem' to the height of your header
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="relative bg-gray-800 bg-opacity-60 p-6 md:p-12 rounded-lg w-full md:max-w-10xl mx-4 md:mx-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">Welcome to Fitness Tracker</h2>
        <p className="text-base md:text-lg text-white mb-6 md:mb-8 leading-relaxed">
          Track your fitness goals and stay motivated with our easy-to-use app. Whether you're looking to lose weight, build muscle, or just stay active, our app provides all the tools you need to succeed.
        </p>
        <a
          href="#features"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
