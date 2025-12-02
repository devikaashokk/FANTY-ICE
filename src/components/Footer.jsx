import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer');
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.display = 'flex';
      } else {
        footer.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-left">
        <ul className="footer-links">
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/terms">Terms and Conditions</Link></li>
          <li><Link to="/privacypolicy">Privacy Policy</Link></li>
        </ul>
      </div>
      <div className="footer-center">
        <h2 className="colored-text">Fanty Ice Candy</h2>
      </div>
      <div className="footer-right">
        <p>Email: <a href="mailto:info@fantyicecandy.com">info@fantyicecandy.com</a></p>
        <p>Website: <a href="https://www.fantyicecandy.com">www.fantyicecandy.com</a></p>
      </div>
    </footer>
  );
}

export default Footer;
