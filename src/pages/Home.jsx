// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import CarouselComponent from '../components/Carousel';
import FeatureSection from '../components/FeatureSection';
import ContactSection from '../components/ContactSection';
import Pricing from '../components/Pricing';

const Home = () => (
  <div>
    <HeroSection />
    <FeatureSection id="features"/>
    <Pricing />
    <CarouselComponent />
    <ContactSection />
  </div>
);

export default Home;
