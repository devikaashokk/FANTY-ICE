import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();
  
  // Refs for sections
  const heroRef = useRef(null);
  const floatingRef = useRef([]);
  const statsRef = useRef(null);
  const productsRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  // Enhanced clear function with GSAP support
  const clearInlineHiddenStyles = useCallback((root, selectors = []) => {
    try {
      selectors.forEach(sel => {
        const els = (root || document).querySelectorAll(sel);
        els.forEach(el => {
          if (el.style) {
            ['opacity', 'transform', 'visibility', 'willChange'].forEach(prop => {
              el.style[prop] = '';
            });
          }
          // Remove GSAP markers
          el.removeAttribute('data-gsap-animating');
        });
      });
    } catch (err) {
      // Silent fail
    }
  }, []);

  // Force visibility helper
  const forceVisibility = useCallback((gsap) => {
    const selectors = ['.hero-title', '.brand-name', '.hero-subtitle', '.hero-cta', '.product-card', '.testimonial-card'];
    selectors.forEach(sel => {
      const els = document.querySelectorAll(sel);
      if (gsap) {
        gsap.set(els, { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'all' });
      } else {
        els.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }
    });
  }, []);

  useEffect(() => {
    let scriptsAppended = [];
    let timeoutId = null;

    const safeLoadScriptsAndAnimate = async () => {
      try {
        // Safety timeout - force visibility after 3s max
        timeoutId = setTimeout(() => {
          forceVisibility(window.gsap);
          clearInlineHiddenStyles(document);
        }, 3000);

        // Load GSAP core
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        gsapScript.async = true;
        
        await new Promise((resolve, reject) => {
          gsapScript.onload = () => resolve(gsapScript);
          gsapScript.onerror = reject;
          document.head.appendChild(gsapScript);
          scriptsAppended.push(gsapScript);
        });

        // Load ScrollTrigger
        if (window.gsap) {
          const scrollTriggerScript = document.createElement('script');
          scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
          scrollTriggerScript.async = true;
          
          await new Promise((resolve, reject) => {
            scrollTriggerScript.onload = () => {
              window.gsap.registerPlugin(window.ScrollTrigger);
              resolve(scrollTriggerScript);
            };
            scrollTriggerScript.onerror = reject;
            document.head.appendChild(scrollTriggerScript);
            scriptsAppended.push(scrollTriggerScript);
          });

          // Clear safety timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }

          const gsap = window.gsap;

          // 1. HERO ANIMATIONS (immediate, no scroll dependency)
          try {
            const heroRoot = heroRef.current;
            if (heroRoot) {
              const elements = {
                title: heroRoot.querySelector('.hero-title'),
                brand: heroRoot.querySelector('.brand-name'),
                subtitle: heroRoot.querySelector('.hero-subtitle'),
                cta: heroRoot.querySelector('.hero-cta')
              };

              // Mark as animating
              Object.values(elements).forEach(el => {
                if (el) el.setAttribute('data-gsap-animating', 'true');
              });

              // Sequential hero animations
              gsap.fromTo(elements.title, 
                { opacity: 0, y: 80 }, 
                { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
              );
              gsap.fromTo(elements.brand, 
                { opacity: 0, scale: 0.6 }, 
                { opacity: 1, scale: 1, duration: 0.9, delay: 0.3, ease: 'elastic.out(1,0.5)' }
              );
              gsap.fromTo(elements.subtitle, 
                { opacity: 0, y: 40 }, 
                { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' }
              );
              gsap.fromTo(elements.cta, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'back.out(1.6)' }
              );
            }
          } catch (err) {
            forceVisibility(gsap);
          }

          // 2. FLOATING ELEMENTS (continuous)
          try {
            floatingRef.current.forEach((el, i) => {
              if (el) {
                gsap.to(el, {
                  y: -28,
                  rotation: 360,
                  duration: 4 + i * 0.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut'
                });
              }
            });
          } catch (err) {}

          // 3. STATS COUNTER
          try {
            if (statsRef.current) {
              const stats = statsRef.current.querySelectorAll('.stat-number');
              stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
                gsap.to(stat, {
                  innerHTML: target,
                  duration: 2.5,
                  snap: { innerHTML: 1 },
                  scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 85%',
                    once: true
                  }
                });
              });
            }
          } catch (err) {}

          // 4. PRODUCTS (scroll triggered with fallback)
          try {
            if (productsRef.current) {
              const productEls = productsRef.current.querySelectorAll('.product-card');
              if (productEls.length) {
                productEls.forEach(el => el.setAttribute('data-gsap-animating', 'true'));
                
                gsap.fromTo(productEls, 
                  { opacity: 0, y: 60 }, 
                  {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'back.out(1.1)',
                    scrollTrigger: {
                      trigger: productsRef.current,
                      start: 'top 85%',
                      onEnter: () => gsap.set(productEls, { opacity: 1, y: 0 }),
                      onEnterBack: () => gsap.set(productEls, { opacity: 1, y: 0 })
                    }
                  }
                );
              }
            }
          } catch (err) {
            forceVisibility(gsap);
          }

          // 5. TESTIMONIALS (scroll triggered with fallback)
          try {
            if (testimonialsRef.current) {
              const testimonialEls = testimonialsRef.current.querySelectorAll('.testimonial-card');
              if (testimonialEls.length) {
                testimonialEls.forEach(el => el.setAttribute('data-gsap-animating', 'true'));
                
                gsap.fromTo(testimonialEls, 
                  { opacity: 0, x: -80 }, 
                  {
                    opacity: 1,
                    x: 0,
                    stagger: 0.2,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                      trigger: testimonialsRef.current,
                      start: 'top 85%',
                      onEnter: () => gsap.set(testimonialEls, { opacity: 1, x: 0 }),
                      onEnterBack: () => gsap.set(testimonialEls, { opacity: 1, x: 0 })
                    }
                  }
                );
              }
            }
          } catch (err) {
            forceVisibility(gsap);
          }

        }
      } catch (err) {
        forceVisibility(window.gsap);
        clearInlineHiddenStyles(document);
      }
    };

    safeLoadScriptsAndAnimate();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      scriptsAppended.forEach(script => {
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [clearInlineHiddenStyles, forceVisibility]);

  const products = [
    { name: 'Mango Delight', price: '20 Rs', emoji: '🥭' },
    { name: 'Chocolate Fudge', price: '20 Rs', emoji: '🍫' },
    { name: 'Strawberry Swirl', price: '40 Rs', emoji: '🍓' },
    { name: 'Vanilla Bliss', price: '40 Rs', emoji: '🍦' },
    { name: 'Pistachio Dream', price: '30 Ra', emoji: '🌰' },
    { name: 'Blueberry Burst', price: '60 Rs', emoji: '🫐' }
  ];

  const testimonials = [
    { text: "Best ice cream I've ever tasted! The mango flavor is incredible!", author: "Sarah J." },
    { text: "Fanty Ice Candy brings back childhood memories. Absolutely love it!", author: "Mike R." },
    { text: "Fresh ingredients, amazing flavors, and great service!", author: "Emily K." }
  ];

  return (
    <div className="home-container">
      <Header />
      
      <section className="hero-section" ref={heroRef}>
        <div className="hero-overlay" />
        <div className="floating-elements">
          <div className="floating-icon ice-1" ref={el => (floatingRef.current[0] = el)}>🍦</div>
          <div className="floating-icon ice-2" ref={el => (floatingRef.current[1] = el)}>🍨</div>
          <div className="floating-icon ice-3" ref={el => (floatingRef.current[2] = el)}>🧁</div>
          <div className="floating-icon ice-4" ref={el => (floatingRef.current[3] = el)}>🍰</div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            TASTE THE MAGIC OF <span className="brand-name">FANTY</span>
          </h1>
          <p className="hero-subtitle">Handcrafted frozen delights that bring joy to every moment</p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => navigate('/shop')}>Explore Flavors 🍦</button>
            <button className="cta-secondary" onClick={() => navigate('/our-story')}>Our Story</button>
          </div>
        </div>
        {/* <div className="scroll-indicator">
          <span>Scroll to discover</span>
          <div className="scroll-arrow">↓</div>
        </div> */}
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className="stat-card">
          <div className="stat-number" data-target="50">0</div>
          <div className="stat-label">Unique Flavors</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-target="10000">0</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-target="5">0</div>
          <div className="stat-label">Years of Excellence</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" data-target="100">0</div>
          <div className="stat-label">% Natural Ingredients</div>
        </div>
      </section>

      <section className="products-section" ref={productsRef}>
        <div className="section-header">
          <h2>ALL TIME FAVORITES</h2>
          <p>Discover our most loved flavors, crafted with passion</p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-icon">{product.emoji}</div>
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button className="add-to-cart-btn" onClick={() => navigate('/shop')}>
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="features-section">
        <h2>Why Choose Fanty?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>100% Natural</h3>
            <p>Made with real fruits and premium ingredients</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❄️</div>
            <h3>Always Fresh</h3>
            <p>Prepared daily for maximum flavor</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Award Winning</h3>
            <p>Recognized for quality and taste</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💚</div>
            <h3>Family Recipe</h3>
            <p>Passed down through generations</p>
          </div>
        </div>
      </section> */}

      <section className="testimonials-section" ref={testimonialsRef}>
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">— {t.author}</div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience the Magic?</h2>
          <p>Join thousands of happy customers who trust Fanty Ice Candy</p>
          <button className="cta-large" onClick={() => navigate('/shop')}>
            Shop Now 🛒
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
