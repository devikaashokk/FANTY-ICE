import React from 'react';
import '../styles/AboutUsPage.css'; // Import the specific CSS for About Us page

const AboutUsPage = () => {
  return (
    <div className="abou-us-page">
      <h1 className="abou-us-title">About Us</h1>
      <p className="abou-us-description">
        At <strong>Fanty Ice Candy</strong>, we are passionate about bringing joy to people through
        our premium ice candies. Founded in 2020, our mission is to create delightful and refreshing
        treats made from the finest ingredients.
      </p>
      <section className="abou-us-section">
        <h2 className="abou-us-subtitle">Our Vision</h2>
        <p className="abou-us-text">
          Our vision is to be a leading brand in the ice candy industry, offering unique and delicious
          flavors that everyone can enjoy.
        </p>
      </section>
      <section className="abou-us-section">
        <h2 className="abou-us-subtitle">Our Commitment</h2>
        <p className="abou-us-text">
          We are committed to quality and sustainability, using eco-friendly packaging and sourcing our
          ingredients responsibly.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
