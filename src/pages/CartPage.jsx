import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cart from "../components/Cart";
import "../styles/cart.css";

function CartPage() {
  const [orderHistory, setOrderHistory] = useState([]); // Initialize as an array
  const navigate = useNavigate(); // Initialize navigate

  // Load order history from localStorage on component mount
  useEffect(() => {
    const savedOrderHistory = localStorage.getItem("orderHistory");
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

  // Save order history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }, [orderHistory]);

  const handleClearOrderHistory = () => {
    setOrderHistory([]);
    localStorage.removeItem("orderHistory");
  };

  const handleAddItemClick = () => {
    navigate("/shop"); // Redirect to the Shop page
  };

  return (
    <div className="cart-page-container">
      {/* Cart Section */}
      <div className="cart-section">
        <h1>Your Cart</h1>
        <Cart orderHistory={orderHistory} setOrderHistory={setOrderHistory} />
      </div>

      {/* Add to Cart Section */}
      <div className="cart-add-to-cart-section">
        <h2>Add Item to Cart</h2>
        <button
          className="cart-add-to-cart-button"
          onClick={handleAddItemClick} // Use the navigate function here
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default CartPage;
