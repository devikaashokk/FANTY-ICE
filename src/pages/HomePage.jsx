import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductListHome from '../components/ProductListHome'; // For displaying products
import Testimonials from '../components/Testimonials';
import IceCreamQuote from '../components/IceCreamQuote';
import heroImage from '../assets/hero-image.jpeg';
import rightImage from '../assets/right-image.jpeg';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();
  const quoteRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (quoteRef.current) {
        const rect = quoteRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          quoteRef.current.classList.add('show');
        }
      }
    };

    setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }, 0);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewProductsClick = () => {
    navigate('/shop'); // Redirect to the Shop page
  };

  return (
    <div className="home">
      <Header />
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="pop-up-text">TASTE THE MAGIC OF <div>FANTY</div></h1>
          <button
            className="view-products-button"
            onClick={handleViewProductsClick}
          >
            View Products
          </button>
        </div>
        <img src={heroImage} alt="Ice Creams" className="hero-image" />
        <img src={rightImage} alt="Delicious Ice Cream" className="right-image" />
      </header>
      <IceCreamQuote ref={quoteRef} />
      <main>
        <section id="products" className="products-section">
          <h2>"ALL TIME FAVORITES!"</h2>
          <ProductListHome /> {/* Display products */}
        </section>
        <Testimonials /> {/* Display testimonials */}
      </main>
    </div>
  );
}

export default Home;
