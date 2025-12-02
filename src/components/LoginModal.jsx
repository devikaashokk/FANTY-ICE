import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Importing the AuthContext
import axios from 'axios'; // For handling OTP API calls
import '../styles/loginModal.css'; // Ensure you have styling for the modal

function LoginModal({ isVisible, onClose, onLoginSuccess }) {
  const { login, register, user } = useAuth(); // Extracting login, register, and user from the context
  const [name, setName] = useState(''); // For registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState(''); // For OTP login
  const [otp, setOtp] = useState(''); // For OTP verification
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between login and register
  const [isOtpLogin, setIsOtpLogin] = useState(false); // To toggle between email/password and OTP login
  const [step, setStep] = useState('enterMobile'); // Tracks OTP flow steps
  const [error, setError] = useState(''); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  // Effect to trigger the callback after successful login
  useEffect(() => {
    if (user) {
      if (onLoginSuccess) onLoginSuccess(); // Trigger the callback after successful login
      onClose(); // Close the modal when the user is logged in
    }
  }, [user, onLoginSuccess, onClose]);

  // Function to handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isOtpLogin) {
        if (step === 'enterMobile') {
          // Step 1: Send OTP
          await axios.post('/api/send-otp', { mobile });
          setStep('enterOtp'); // Move to OTP entry step
        } else if (step === 'enterOtp') {
          // Step 2: Verify OTP
          await axios.post('/api/verify-otp', { mobile, otp });
          if (onLoginSuccess) onLoginSuccess(); // Trigger login success callback
          onClose(); // Close the modal
        }
      } else {
        // Handle Email/Password Login or Registration
        if (isRegistering) {
          await register(name, email, password); // Register the user
        } else {
          await login(email, password); // Login the user
        }
        if (onLoginSuccess) onLoginSuccess(); // Trigger login success callback
        onClose(); // Close the modal
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong. Please check your input and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setMobile('');
    setOtp('');
    setStep('enterMobile'); // Reset OTP flow to mobile entry
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {isOtpLogin
            ? 'Login with OTP'
            : isRegistering
            ? 'Register'
            : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isOtpLogin ? (
            <>
              {step === 'enterMobile' && (
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number:</label>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="Enter your mobile number"
                  />
                </div>
              )}
              {step === 'enterOtp' && (
                <div className="form-group">
                  <label htmlFor="otp">OTP:</label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter the OTP sent to your mobile"
                  />
                </div>
              )}
            </>
          ) : isRegistering ? (
            <>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading
              ? 'Processing...'
              : isOtpLogin
              ? step === 'enterOtp'
                ? 'Verify OTP'
                : 'Send OTP'
              : isRegistering
              ? 'Register'
              : 'Login'}
          </button>
        </form>
        <div className="toggle-form">
          <span onClick={() => setIsOtpLogin(!isOtpLogin)}>
            {isOtpLogin
              ? 'Login with Email/Password'
              : 'Login with OTP'}
          </span>
          {!isOtpLogin && (
            <span onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </span>
          )}
        </div>
        <button className="close-btn" onClick={onClose} disabled={loading}>
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
