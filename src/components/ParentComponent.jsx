import React, { useState } from 'react';
import LoginModal from './LoginModal'; // Adjust the path as needed
import { useAuth } from '../context/AuthContext'; // Importing AuthContext

const ParentComponent = () => {
  const { user } = useAuth(); // Accessing user state from AuthContext
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleLoginSuccess = () => {
    console.log('Login successful!');
    setIsModalVisible(false); // Close modal on success
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleOpenModal}>Login</button>
      ) : (
        <div>Welcome, {user.name}!</div>
      )}
      <LoginModal 
        isVisible={isModalVisible} 
        onClose={handleCloseModal} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </div>
  );
};

export default ParentComponent;
