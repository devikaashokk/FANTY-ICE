import React from 'react';
import '../styles//PrivacyPolicyPage.css'; // Import the specific CSS for Privacy Policy page

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-page">
      <h1 className="privacy-policy-title">Privacy Policy</h1>
      <p className="privacy-policy-intro">
        At Fanty Ice Candy, we value your privacy and are committed to protecting your personal
        information. This Privacy Policy outlines the types of information we collect, how we use
        it, and how we safeguard your data.
      </p>
      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">1. Information We Collect</h2>
        <p className="privacy-policy-text">
          We collect personal information such as your name, email address, and billing information
          when you make a purchase or sign up for our services.
        </p>
      </section>
      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">2. How We Use Your Information</h2>
        <p className="privacy-policy-text">
          The information we collect is used to process orders, communicate with you about your
          purchases, and improve our services. We may also use your information for marketing purposes,
          but only with your consent.
        </p>
      </section>
      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">3. Data Security</h2>
        <p className="privacy-policy-text">
          We take data security seriously and implement industry-standard measures to protect
          your personal information. However, no method of transmission over the internet is
          completely secure, so we cannot guarantee absolute security.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
