// src/components/Carousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const testimonials = [
    {
      quote: "This app has completely changed the way I approach my fitness routine. I feel stronger and more motivated every day. Highly recommended!",
      author: "John Doe, Professional Athlete"
    },
    {
      quote: "A must-have app for anyone serious about their fitness goals. The personalized workout plans have helped me achieve my goals faster.",
      author: "Jane Smith, Fitness Enthusiast"
    },
    {
      quote: "The best fitness tracker I've used so far. The intuitive interface and real-time tracking keep me on top of my progress.",
      author: "Mike Johnson, Health Coach"
    },
    {
      quote: "With this app, I’ve managed to lose 15 pounds and feel more energetic. The progress tracking is simply amazing!",
      author: "Sarah Williams, Busy Professional"
    },
    {
      quote: "The community features in this app are great! I love connecting with others on the same fitness journey.",
      author: "Emily Davis, Yoga Instructor"
    },
    {
      quote: "Finally, a fitness app that understands my needs. The tailored workouts and meal plans are a game changer.",
      author: "James Brown, Personal Trainer"
    },
    {
      quote: "The motivation I get from the daily challenges keeps me going. I never knew working out could be this fun!",
      author: "Sophia Lee, University Student"
    },
    {
      quote: "I’ve tried many apps, but this one stands out with its comprehensive features and user-friendly design. A real game-changer!",
      author: "David Wilson, Marathon Runner"
    }
  ];
  

const CarouselComponent = () => (
  <section id="carousel" className="py-20" style={{ backgroundColor: '#e0f7fa' }}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Users Say</h2>
      <Carousel 
        showThumbs={false} 
        autoPlay 
        infiniteLoop 
        interval={5000} 
        showStatus={false} 
        showIndicators={true} 
        dynamicHeight={false}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="text-center p-8 bg-white rounded-lg shadow-lg mx-6">
            <p className="text-xl italic text-gray-700 mb-6">"{testimonial.quote}"</p>
            <p className="text-lg font-semibold text-gray-900">- {testimonial.author}</p>
          </div>
        ))}
      </Carousel>
    </div>
  </section>
);

export default CarouselComponent;
