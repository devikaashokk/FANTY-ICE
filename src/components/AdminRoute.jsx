import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate to handle redirection
import { useAuth } from './context/AuthContext'; // Import AuthContext to access authentication details

function AdminRoute({ children }) {
  const { user, isAuthenticated, isAdmin } = useAuth(); // Access authentication data from AuthContext

  // If the user is not logged in, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is not an admin, redirect to the home page or an unauthorized page
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in and is an admin, render the children (i.e., the admin page content)
  return children;
}

export default AdminRoute;
