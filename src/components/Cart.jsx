import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const API_URL = "http://localhost:5000/api/cart";
const ORDER_API_URL = "http://localhost:5000/api/orders";

function Cart() {
  const { user, isAuthenticated, token } = useAuth(); // Access user, authentication status, and token from context
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [orderFormVisible, setOrderFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load order history from local storage
  useEffect(() => {
    const savedOrderHistory = localStorage.getItem("orderHistory");
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory)); // Load order history from localStorage
    }
  }, []);

  // Fetch cart items when the component mounts or when the user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get(`${API_URL}/items?userId=${user._id}`);
          if (response.data && response.data.items) {
            setCartItems(response.data.items);
          }
        } catch (error) {
          setError("Error fetching cart items. Please try again.");
        }
      }
    };
    fetchCartItems();
  }, [isAuthenticated, user]);

  // Save order history to local storage whenever it changes
  useEffect(() => {
    if (orderHistory.length > 0) {
      localStorage.setItem("orderHistory", JSON.stringify(orderHistory)); // Save order history to localStorage
    }
  }, [orderHistory]);

  // Calculate total and discounted price
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountedPrice = totalPrice - totalPrice * appliedDiscount;

  // Handle cart item removal
  const removeItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/remove`, {
        data: { userId: user._id, itemId: id },
      });
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      setError("Error removing item from cart.");
    }
  };

  // Handle quantity change for cart items
  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return; // Prevent invalid quantities
    try {
      const updatedCart = cartItems.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );
      setCartItems(updatedCart);
      await axios.post(`${API_URL}/update`, { userId: user._id, itemId: id, quantity });
    } catch (error) {
      setError("Error updating item quantity.");
    }
  };

  // Apply discount code logic
  const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10") {
      setAppliedDiscount(0.1);
      setSuccessMessage("Discount applied successfully!");
      setError(null);
    } else {
      setAppliedDiscount(0);
      setError("Invalid discount code!");
    }
  };

  // Handle order form visibility
  const handleOrder = () => {
    if (cartItems.length > 0) {
      setOrderFormVisible(true);
      setError(null);
    } else {
      setError("Your cart is empty. Cannot proceed to checkout.");
    }
  };

  // Submit the order form
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Check if all form fields are filled
    if (!name || !contactNumber || !address) {
      setError("All fields must be filled out.");
      return;
    }

    // Check if the user is authenticated and has a token
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    // Prepare the order payload
    const orderItems = cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = appliedDiscount > 0 ? discountedPrice : totalPrice;

    const newOrder = {
      name,
      contactNumber,
      address,
      discountCode,
      cartItems: orderItems,
      totalAmount,
    };

    try {
      const response = await axios.post(`${ORDER_API_URL}/checkout`, newOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Log the order response to the console
        console.log("Order response:", response.data);

        // Log the order into the order history state
        setOrderHistory([
          ...orderHistory,
          { ...newOrder, id: Date.now(), date: new Date().toLocaleDateString() },
        ]);

        // Save order history to localStorage immediately after placing an order
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

        // Empty the cart and hide the form
        setCartItems([]);
        setOrderFormVisible(false);
        setError(null);
      } else {
        setError("Failed to place the order.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Error placing order. Please try again.");
      }
    }
  };

  // Delete an order from the history
  const handleDeleteOrder = (orderId) => {
    const updatedOrderHistory = orderHistory.filter((order) => order.id !== orderId);
    setOrderHistory(updatedOrderHistory);

    // Update localStorage immediately after deleting an order
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
  };

  const CartItem = ({ item }) => (
    <li key={item._id} className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <div className="cart-quantity-controls">
          <label>Qty:</label>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
          />
        </div>
        <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
      </div>
      <button className="cart-remove-button" onClick={() => removeItem(item._id)}>
        Remove
      </button>
    </li>
  );

  return (
    <div className="cart-page-container">
      <div className="cart-layout">
        <div className="cart-section">
          <h2>Your Shopping Cart</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {cartItems.length > 0 ? (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ul>
          ) : (
            <p className="empty-cart">Your cart is empty.</p>
          )}
          {cartItems.length > 0 && (
            <div className="cart-summary">
              <div className="discount-section">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={handleApplyDiscount}>Apply Discount</button>
              </div>
              <p>Total: ${totalPrice.toFixed(2)}</p>
              {appliedDiscount > 0 && <p>Discount Applied: -${(totalPrice * appliedDiscount).toFixed(2)}</p>}
              <p>
                Final Total: ${discountedPrice > 0 ? discountedPrice.toFixed(2) : totalPrice.toFixed(2)}
              </p>
              <button onClick={handleOrder} className="checkout-button">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>

        <div className="order-history">
          <h2>Order History</h2>
          {orderHistory.length > 0 ? (
            orderHistory.map((order) => (
              <div key={order.id} className="order-history-item">
                <p>Order ID: {order.id}</p>
                <p>Total: ${order.totalAmount.toFixed(2)}</p>
                <p>Date: {order.date}</p>
                <button
                  className="delete-order-button"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Delete Order
                </button>
              </div>
            ))
          ) : (
            <p>No previous orders found.</p>
          )}
        </div>
      </div>

      {orderFormVisible && (
        <div className="order-form">
          <h2>Order Details</h2>
          <form onSubmit={handleSubmitOrder}>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address"> Address:</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                
              />
            </div>
            <button type="submit" className="submit-order-button">
              Submit Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
