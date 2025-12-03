import React from 'react';
import { Link } from 'react-router-dom';
import aboutBg from '../assets/about-us-image1.jpeg'; // ensure this file exists
import '../styles/combinedStyles.css';

function AboutUs() {
  return (
    <section
      className="about-us-section"
      style={{ backgroundImage: `url(${aboutBg})` }}
      aria-labelledby="about-heading"
    >
      <div className="container about-us-container">
        <div className="about-us-text" role="region" aria-labelledby="about-heading">
          <h2 id="about-heading">OUR STORY</h2>
          <p>
            Bringing joy and sweetness to every bite since our humble beginnings.
            Welcome to the journey of Fanty Ice Candy!
          </p>
          <Link to="/our-story" className="read-more-link">Read More</Link>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
