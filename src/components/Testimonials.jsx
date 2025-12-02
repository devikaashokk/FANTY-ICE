import React from 'react';
import '../styles/testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials">
        <div className="testimonial">
          <p>"Fanty's ice cream is the best! I love the Mango Delight."</p>
          <h4>- Alex</h4>
        </div>
        <div className="testimonial">
          <p>"The Chocolate Fudge is to die for. Absolutely delicious!"</p>
          <h4>- Jamie</h4>
        </div>
        <div className="testimonial">
          <p>"I can't get enough of the Pistachio Dream. Highly recommend!"</p>
          <h4>- Sam</h4>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
