import React from 'react';
import '../styles/AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <main className="about-us-page" role="main">
      <h1 className="about-us-title">About Us</h1>

      <p className="about-us-description">
        At <strong>Fanty Ice Candy</strong>, we are passionate about bringing joy to people through
        our premium ice candies. Founded in 2020, our mission is to create delightful and refreshing
        treats made from the finest ingredients.
      </p>

      <section className="about-us-section-block">
        <h2 className="about-us-subtitle">Our Vision</h2>
        <p className="about-us-text">
          Our vision is to be a leading brand in the ice candy industry, offering unique and delicious
          flavors that everyone can enjoy.
        </p>
      </section>

      <section className="about-us-section-block">
        <h2 className="about-us-subtitle">Our Commitment</h2>
        <p className="about-us-text">
          We are committed to quality and sustainability, using eco-friendly packaging and sourcing our
          ingredients responsibly.
        </p>
      </section>
    </main>
  );
};

export default AboutUsPage;
