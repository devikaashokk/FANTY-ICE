import React from 'react';
import '../styles/testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">What Our Customers Say</h2>
      <div className="testimonials">
        <article className="testimonial" role="article" aria-label="testimonial Alex">
          <p>"Fanty's ice cream is the best! I love the Mango Delight."</p>
          <h4>- Alex</h4>
        </article>

        <article className="testimonial" role="article" aria-label="testimonial Jamie">
          <p>"The Chocolate Fudge is to die for. Absolutely delicious!"</p>
          <h4>- Jamie</h4>
        </article>

        <article className="testimonial" role="article" aria-label="testimonial Sam">
          <p>"I can't get enough of the Pistachio Dream. Highly recommend!"</p>
          <h4>- Sam</h4>
        </article>
      </div>
    </section>
  );
}

export default Testimonials;
