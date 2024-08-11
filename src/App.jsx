// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pricing from './pages/Pricing';
import GoalTracking from './pages/GoalTracking';
import PrivateRoute from './components/PrivateRoute';
import WorkoutPlans from './pages/WorkoutPlans';
import AllWorkoutPlans from './pages/AllWorkoutPlans';

const App = () => (
  <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/all-plans" element={<AllWorkoutPlans />} />
          <Route path="/goal-tracking" element={<PrivateRoute element={GoalTracking} />} />
          <Route path="/workout-plans" element={<PrivateRoute element={WorkoutPlans} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </>
);

export default App;
