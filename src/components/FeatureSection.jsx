// src/components/FeatureSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const FeatureSection = ({ id }) => (
  <section id={id} className="bg-gray-100 py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Features</h2>
      <p className="text-lg mb-12 text-gray-600 max-w-3xl mx-auto">
        Discover the amazing features of our app that will help you stay on track and achieve your fitness goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <Link to="/goal-tracking" className="feature-item p-8 bg-white rounded-lg shadow-md">
          <div className="mb-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1682309772037-8da49abb2b84?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Goal Tracking"
              className="w-24 h-24 mx-auto object-cover rounded-full"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">Goal Tracking</h3>
          <p className="text-gray-600">
            Set and track your fitness goals with ease, and stay motivated as you see your progress over time.
          </p>
        </Link>
        <Link to="/workout-plans" className="feature-item p-8 bg-white rounded-lg shadow-md">
          <div className="mb-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1661776608612-523ebf5a19d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Workout Plans"
              className="w-24 h-24 mx-auto object-cover rounded-full"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">Workout Plans</h3>
          <p className="text-gray-600">
            Access a variety of workout plans tailored to your fitness level and goals, from beginner to advanced.
          </p>
        </Link>
        <Link to="/nutrients" className="feature-item p-8 bg-white rounded-lg shadow-md">
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Nutrition Guidance"
              className="w-24 h-24 mx-auto object-cover rounded-full"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">Nutrition Guidance</h3>
          <p className="text-gray-600">
            Receive personalized nutrition advice and meal plans to help you achieve your goals.
          </p>
        </Link>
      </div>
    </div>
  </section>
);

export default FeatureSection;
