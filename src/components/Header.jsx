import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import LoginModal from './LoginModal'; // Import the LoginModal component

function Header() {
  const { user, logout } = useAuth(); // Use AuthContext to get user and logout function
  const [isLoginModalVisible, setLoginModalVisible] = useState(false); // State for login modal visibility

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">FANTY ICE CANDY</Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li><Link className="nav-link" to="/"><b>HOME</b></Link></li>
          <li><Link className="nav-link" to="/our-story"><b>OUR STORY</b></Link></li>
          <li><Link className="nav-link" to="/cart"><b>CART</b></Link></li>
          <li><Link className="nav-link" to="/contact"><b>CONTACT US</b></Link></li>
          {user ? (
            <li className="nav-link profile-menu">
              <span>Welcome, {user.name || "User"}!</span>
              <ul className="dropdown-menu">
                <li><Link to="/profile"><b>MY PROFILE</b></Link></li>
                <li onClick={handleLogout}><b>LOGOUT</b></li>
              </ul>
            </li>
          ) : (
            <li>
              <button
                className="nav-link login-button"
                onClick={() => setLoginModalVisible(true)}
              >
                <b>LOGIN / REGISTER</b>
              </button>
            </li>
          )}
        </ul>
      </nav>
      {isLoginModalVisible && (
        <LoginModal
          isVisible={isLoginModalVisible}
          onClose={() => setLoginModalVisible(false)}
          onLoginSuccess={() => setLoginModalVisible(false)}
        />
      )}
    </header>
  );
}

export default Header;
