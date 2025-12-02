import React from "react";
import heroImage1 from "../assets/hero-image1.jpeg";
import processImage from "../assets/processimg.jpeg";
import teamImage from "../assets/team.jpeg";
import "../styles/ourStory.css";
import { Link } from 'react-router-dom';

// Inside your component (e.g., IceCreamQuote or Homepage)
const OurStory = () => {
  return (
    <div className="story-container">
      {/* Hero Section */}
      <section className="story-hero">
        <img src={heroImage1} alt="Hero" className="story-hero-image" />
        <div className="story-hero-text">
          <h1>OUR STORY</h1>
          <p>
            Bringing joy and sweetness to every bite since our humble beginnings. Welcome to the journey of Fanty Ice Candy!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="story-about">
        <div className="story-about-content">
          <h2>How It All Started</h2>
          <p>
            Fanty Ice Candy began as a family’s dream to create handcrafted frozen treats with unique flavors. Our journey started in a cozy kitchen, experimenting with recipes passed down through generations.
          </p>
        </div>
        <img src={processImage} alt="Process" className="story-about-image" />
      </section>

      {/* Team Section */}
      <section className="story-team">
        <h2>Meet Our Team</h2>
        <div className="story-team-content">
          <p>
            Our team is a family of passionate individuals committed to crafting the best ice candies for you. Each member plays a vital role in making Fanty Ice Candy special.
          </p>
          <img src={teamImage} alt="Team" className="story-team-image" />
        </div>
      </section>

      {/* Milestones Section */}
      <section className="story-milestones">
        <h2>Our Journey</h2>
        <div className="story-milestone-list">
          <div className="story-milestone">
            <h3>Year 1</h3>
            <p>Fanty Ice Candy was born in a small kitchen.</p>
          </div>
          <div className="story-milestone">
            <h3>Year 3</h3>
            <p>Opened our first shop in the heart of the city.</p>
          </div>
          <div className="story-milestone">
            <h3>Today</h3>
            <p>Innovating with over 50 unique flavors and spreading joy everywhere!</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="story-cta">
        <h2>Be Part of Our Sweet Journey</h2>
        <p>Discover the joy of Fanty Ice Candy and create unforgettable memories.</p>
        {/* Link to the products page */}
        <Link to="/shop">
          <button className="story-cta-button">Visit Our Shop</button>
        </Link>
      </section>
    </div>
  );
};

export default OurStory;
