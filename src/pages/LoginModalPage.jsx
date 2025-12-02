import React from 'react';
import LoginModal from '../components/LoginModal';
import '../styles/loginModal.css';

function LoginModalPage() {
  return (
    <div className="page-container">
      <h1>Login / Register</h1>
      <LoginModal isVisible={true} onClose={() => {}} onLoginSuccess={() => {}} />
    </div>
  );
}

export default LoginModalPage;
