import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS

// Import pages
import Home from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import OurStoryPage from './pages/OurStoryPage';
import ShopPage from './pages/ShopPage';
import ProfilePage from './pages/ProfilePage';
import LoginModalPage from './pages/LoginModalPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage'; // Import your admin page
import AboutUsPage from './pages/AboutUsPage'; // Import About Us page
import TermsPage from './pages/TermsPage'; // Import Terms page
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'; // Import Privacy Policy page

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import contexts
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider> {/* Wrap the app in the AuthProvider */}
      <CartProvider> {/* Wrap the app in the CartProvider */}
        <Router>
          <Header /> {/* Always render header */}
          <MainContent /> {/* Render main content with routing */}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// AdminRoute component to protect admin routes
function AdminRoute({ children }) {
  const { user } = useAuth(); // Get the logged-in user from AuthContext

  // Check if user is logged in and if they are an admin
  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    // If user is not an admin, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  // If user is logged in and is an admin, render the child components
  return children;
}

// Component to handle conditional footer rendering
function MainContent() {
  const location = useLocation(); // To track the current route

  // Check if the current route is /profile (if true, hide footer)
  const hideFooter = location.pathname === '/profile';

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Product detail page for individual product */}
          <Route path="/cart" element={<CartPage />} /> {/* Cart page */}
          <Route path="/contact" element={<ContactPage />} /> {/* Contact page */}
          <Route path="/our-story" element={<OurStoryPage />} /> {/* Our Story page */}
          <Route path="/shop" element={<ShopPage />} /> {/* Shop page for products */}
          <Route path="/profile" element={<ProfilePage />} /> {/* User profile page */}
          <Route path="/login" element={<LoginModalPage />} /> {/* Login page */}
          
          {/* Protect the admin route using AdminRoute */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage /> {/* Admin dashboard page */}
              </AdminRoute>
            }
          />

          {/* Add new routes */}
          <Route path="/aboutus" element={<AboutUsPage />} /> {/* About Us page */}
          <Route path="/terms" element={<TermsPage />} /> {/* Terms and Conditions page */}
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} /> {/* Privacy Policy page */}
        </Routes>
      </main>
      {/* Conditionally render footer based on the current route */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
