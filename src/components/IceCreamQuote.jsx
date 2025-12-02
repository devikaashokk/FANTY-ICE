import React, { forwardRef } from 'react';
import leftImage from '../assets/left-image.jpeg';
import rightImage from '../assets/right-image.jpeg';
import AboutUs from './AboutUs';
import '../styles/combinedStyles.css';

const IceCreamQuote = forwardRef((props, ref) => {
  return (
    <div>
      <section className="ice-cream-quote" ref={ref}>
        <img src={leftImage} alt="Ice Cream Left" className="side-image" />
        <div className="about-us-container">
          <AboutUs />
        </div>
        <img src={rightImage} alt="Ice Cream Right" className="side-image" />
      </section>
    </div>
  );
});

export default IceCreamQuote;
