import React from 'react';
import '../styles/TermsPage.css'; // Import the specific CSS for Terms page

const TermsPage = () => {
  return (
    <div className="terms-page">
      <h1 className="terms-title">Terms and Conditions</h1>
      <p className="terms-intro">
        Please read these Terms and Conditions ("Terms") carefully before using the Fanty Ice Candy website.
      </p>
      <section className="terms-section">
        <h2 className="terms-subtitle">1. Introduction</h2>
        <p className="terms-text">
          These Terms apply to your use of the website, services, and products provided by Fanty Ice Candy.
        </p>
      </section>
      <section className="terms-section">
        <h2 className="terms-subtitle">2. Product Information</h2>
        <p className="terms-text">
          All products are subject to availability, and we reserve the right to limit quantities or change
          prices without notice.
        </p>
      </section>
      <section className="terms-section">
        <h2 className="terms-subtitle">3. User Responsibilities</h2>
        <p className="terms-text">
          As a user, you are responsible for maintaining the confidentiality of your account details and
          using the website in compliance with these Terms.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
