import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext'; 
import LoginModal from './LoginModal'; 
import { useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';  // Use this to access cart context
import '../styles/productListShop.css';

function ProductItemShop({ product }) {
  const { user } = useAuth(); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const { addToCart } = useCart();  // Get the addToCart function from CartContext
  const navigate = useNavigate();

  // Close modal when user is logged out
  useEffect(() => {
    if (!user && isModalVisible) {
      setIsModalVisible(false); 
    }
  }, [isModalVisible, user]);

  // Handle Add to Cart action
  const handleAddToCart = () => {
    if (!user) {
      setIsModalVisible(true);  // Show login modal if not logged in
    } else {
      addToCart(product);  // Add product to cart if logged in
    }
  };

  // Handle Login Success (to proceed with Add to Cart)
  const handleLoginSuccess = () => {
    setIsModalVisible(false); 
    addToCart(product);  // Add product to cart after successful login
  };

  // Handle View Details action
  const handleViewDetails = () => {
    if (!user) {
      setIsModalVisible(true);  // Show login modal if not logged in
    } else {
      navigate(`/product/${String(product.id)}`);  // Navigate to product details page if logged in
    }
  };

  return (
    <div className="product-item">
      {/* Product Image */}
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
        
        {/* Add to Cart Button */}
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        
        {/* View Details Button */}
        <button className="view-details-button" onClick={handleViewDetails}>
          View Details
        </button>
      </div>

      {/* Display Login Modal if the user is not logged in */}
      {isModalVisible && (
        <LoginModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)} 
          onLoginSuccess={handleLoginSuccess}  // Add product to cart after login
        />
      )}
    </div>
  );
}

ProductItemShop.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItemShop;
