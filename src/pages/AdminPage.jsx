import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/admin.css";

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // null indicates loading state
  const [users, setUsers] = useState([]); // For managing user data
  const [products, setProducts] = useState([]); // For managing product data
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with your token logic
        if (!token) {
          navigate("/login"); // Redirect to login if there's no token
          return;
        }
        
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("/api/users/admin-status", config); // Backend route to check admin status
        if (data.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false); // Not an admin
          navigate("/"); // Redirect to home if not admin
        }
      } catch (error) {
        console.error("Admin status check failed:", error);
        setIsAdmin(false); // If error occurs, assume not an admin
        navigate("/"); // Redirect non-admins to home page
      }
    };

    fetchAdminStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [usersRes, productsRes] = await Promise.all([
          axios.get("/api/users", config), // Fetch all users
          axios.get("/api/products", config), // Fetch all products
        ]);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Data fetching failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchData();
    } else {
      setLoading(false); // Stop loading if the user is not admin
    }
  }, [isAdmin]);

  if (isAdmin === null || loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (!isAdmin) {
    return <div>You are not authorized to view this page.</div>; // Optionally, show a message or redirect
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* Manage Users Section */}
      <div className="admin-section">
        <h2>Manage Users</h2>
        {users.length > 0 ? (
          <ul className="admin-list">
            {users.map((user) => (
              <li key={user._id}>
                <span>{user.name}</span> ({user.email})
                <button
                  className="admin-action-button"
                  onClick={() => console.log(`Manage ${user.name}`)}
                >
                  Manage User
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Manage Products Section */}
      <div className="admin-section">
        <h2>Manage Products</h2>
        {products.length > 0 ? (
          <ul className="admin-list">
            {products.map((product) => (
              <li key={product._id}>
                <span>{product.name}</span> - ${product.price}
                <button
                  className="admin-action-button"
                  onClick={() => console.log(`Edit ${product.name}`)}
                >
                  Edit Product
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
