import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/combinedStyles.css';

function AboutUs() {
  return (
    <div className="about-us-text">
      <h2>OUR STORY</h2>
      <p>
        Bringing joy and sweetness to every bite since our humble beginnings.
        Welcome to the journey of Fanty Ice Candy!
      </p>
      <Link to="/our-story" className="read-more-link">Read More</Link>
    </div>
  );
}

export default AboutUs;
