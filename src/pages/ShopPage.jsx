import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from '../components/LoginModal';
import '../styles/productListShop.css';
import axios from 'axios';
import mangoImage from '../assets/mango1.jpeg';
import strawberryImage from '../assets/strawberry1.jpeg';
import blueberryImage from '../assets/blueberry.jpeg';
import pineappleImage from '../assets/pineapple.jpeg';
import mixedFruitImage from '../assets/mixedfruit.jpeg';
import watermelonImage from '../assets/watermelon.jpeg';
import appleImage from '../assets/apple.jpeg';
import orangeImage from '../assets/orange.jpeg';
import lemonImage from '../assets/lemon.jpeg';
import peachImage from '../assets/peach.jpeg';
import cherryImage from '../assets/cherry.jpeg';
import kiwiImage from '../assets/kiwi.jpeg';
import ProductModal from "../components/ProductModal";

const products = [
  { id: 1, name: 'Mango Ice Candy', description: 'Delicious mango ice treat', price: 5.99, image: mangoImage },
  { id: 2, name: 'Strawberry Ice Candy', description: 'Sweet and tangy strawberry delight', price: 4.99, image: strawberryImage },
  { id: 3, name: 'Blueberry Ice Candy', description: 'Refreshing blueberry flavor', price: 6.49, image: blueberryImage },
  { id: 4, name: 'Pineapple Ice Candy', description: 'Tropical pineapple goodness', price: 5.49, image: pineappleImage },
  { id: 5, name: 'Mixed Fruit Ice Candy', description: 'A blend of various fruits', price: 7.99, image: mixedFruitImage },
  { id: 6, name: 'Watermelon Ice Candy', description: 'Cool watermelon flavor', price: 4.49, image: watermelonImage },
  { id: 7, name: 'Apple Ice Candy', description: 'Refreshing apple flavor', price: 5.29, image: appleImage },
  { id: 8, name: 'Orange Ice Candy', description: 'Tangy and sweet orange flavor', price: 5.79, image: orangeImage },
  { id: 9, name: 'Lemon Ice Candy', description: 'Zesty lemon ice candy', price: 4.99, image: lemonImage },
  { id: 10, name: 'Peach Ice Candy', description: 'Sweet and smooth peach flavor', price: 6.29, image: peachImage },
  { id: 11, name: 'Cherry Ice Candy', description: 'Tart and sweet cherry flavor', price: 5.89, image: cherryImage },
  { id: 12, name: 'Kiwi Ice Candy', description: 'Exotic kiwi flavor with a twist', price: 6.59, image: kiwiImage },
];

function ShopPage() {
  const { user, token, isAuthenticated } = useAuth();
  const { addToCart, cart } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };


  const isProductInCart = (productId) => {
    return (cart || []).some((item) => item.id === productId);
  };

  const handleAddToCart = async (product) => {
    console.log('User:', user); // Debug log for user
    console.log('Token:', token); // Debug log for token
    if (loading) return;

    if (!isAuthenticated) {
      console.warn('User is not authenticated. Showing login modal.'); // Debug log
      setIsModalVisible(true);
    } else {
      try {
        setLoading(true);
        const userId = user?._id || user?.id; // Prefer _id (MongoDB default)
        if (!userId) {
          console.error('User ID is missing. Cannot add to cart.'); // Debug log for missing user ID
          setNotification('Error: Unable to add item to cart.');
          return;
        }

        const response = await axios.post(
          'http://localhost:5000/api/cart/add',
          {
            userId,
            productId: product.id,
            name: product.name,
            quantity: 1,
            price: product.price,
            image: product.image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Add to Cart Response:', response.data); // Debug log for successful response
        addToCart(product);
        setNotification(response.data.message || `${product.name} added to cart!`);

      } catch (error) {
        console.error('Error adding item to cart:', error.response?.data?.message || error.message);
        setNotification('Failed to add item to cart. Please try again.');
      } finally {
        setLoading(false);
      }

      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className="shop-page">
      <h1>Wanna taste Fanty?</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleViewDetails(product)}
                className="view-details-button"
              >
                View Details
              </button>

              {isProductInCart(product.id) ? (
                <button onClick={() => navigate('/cart')} className="view-cart-button">
                  View Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart-button"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              )}

            </div>
          </div>
        ))}
      </div>

      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      <LoginModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <ProductModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}

export default ShopPage;
