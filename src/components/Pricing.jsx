import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';  // Importing icons for visual enhancement

const Pricing = () => (
  <section className="bg-gradient-to-r from-blue-100 to-gray-200 py-8 border-t-4 border-purple-600">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">Our Pricing Plans</h1>
      <p className="text-lg mb-12">Choose the plan that's right for you and start your fitness journey today!</p>
      
      <div className="flex flex-wrap justify-center gap-8">
        {/* Basic Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border-2 border-gray-300">
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold">Basic Plan</h2>
          </div>
          <p className="text-xl font-bold mb-4">$19.99 / month</p>
          <p className="mb-4">Perfect for individuals who want to start tracking their fitness goals.</p>
          <ul className="list-disc list-inside mb-4">
            <li>Access to basic workouts</li>
            <li>Daily fitness tips</li>
            <li>Weekly progress reports</li>
          </ul>
          <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Sign Up</Link>
        </div>

        {/* Standard Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border-2 border-gray-300">
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold">Standard Plan</h2>
          </div>
          <p className="text-xl font-bold mb-4">$29.99 / month</p>
          <p className="mb-4">Ideal for those who need more personalized guidance and support.</p>
          <ul className="list-disc list-inside mb-4">
            <li>Access to all workouts</li>
            <li>Personalized workout plans</li>
            <li>Monthly one-on-one coaching</li>
          </ul>
          <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Sign Up</Link>
        </div>

        {/* Premium Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border-2 border-gray-300">
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold">Premium Plan</h2>
          </div>
          <p className="text-xl font-bold mb-4">$49.99 / month</p>
          <p className="mb-4">The ultimate plan for those who want comprehensive fitness and wellness support.</p>
          <ul className="list-disc list-inside mb-4">
            <li>All features of Standard Plan</li>
            <li>Access to exclusive content</li>
            <li>Unlimited personal coaching</li>
            <li>Priority support</li>
          </ul>
          <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Sign Up</Link>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
