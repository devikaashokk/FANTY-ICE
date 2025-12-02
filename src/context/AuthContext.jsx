import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [token, setToken] = useState(null); // Store authentication token

  // Load user and token from localStorage when the app initializes
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      console.log('Stored User:', storedUser);  // Debug log for stored user
      console.log('Stored Token:', storedToken);  // Debug log for stored token

      if (storedUser && storedUser !== 'undefined') {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (typeof parsedUser === 'object' && parsedUser !== null) {
            setUser(parsedUser);  // Set user from localStorage
          } else {
            console.error('Invalid user data in localStorage:', storedUser);
          }
        } catch (parseError) {
          console.error('Error parsing user data from localStorage:', parseError);
          localStorage.removeItem('user');
        }
      }

      if (storedToken) {
        setToken(storedToken);  // Set token from localStorage
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Login function to authenticate and store the user and token
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });

      console.log('Login response data:', data);

      if (!data || !data._id || !data.name || !data.email || !data.token) {
        throw new Error('Invalid login response structure');
      }

      setUser(data);  // Save the entire response as the user
      setToken(data.token);

      localStorage.setItem('user', JSON.stringify(data));  // Store user in localStorage
      localStorage.setItem('token', data.token);  // Store token in localStorage

      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

  // Registration function
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/users/register', { name, email, password });

      console.log('Registration response data:', data);

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      console.log('Registration successful:', data.user);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    console.log('Logout successful');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.isAdmin; // Ensure we check if the user is an admin

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
