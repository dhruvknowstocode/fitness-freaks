// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GoalTracking from './pages/GoalTracking';
import PrivateRoute from './components/PrivateRoute';
import WorkoutPlans from './pages/WorkoutPlans';
import AllWorkoutPlans from './pages/AllWorkoutPlans';
import NutrientsPage from './pages/NutrientsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Dashboard from './pages/Dashboard'

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
          <Route path="/all-plans" element={<AllWorkoutPlans />} />
          <Route path="/goal-tracking" element={<PrivateRoute element={GoalTracking} />} />
          <Route path="/workout-plans" element={<PrivateRoute element={WorkoutPlans} />} />
          <Route path="/nutrients" element={<PrivateRoute element={NutrientsPage} />} />
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </>
);

export default App;
