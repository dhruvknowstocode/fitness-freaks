// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => (
  <div>
    <Header />
    <HeroSection />
    <FeatureSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Home;
