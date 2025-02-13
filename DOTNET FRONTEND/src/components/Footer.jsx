import React from 'react';
import '../styles/Footer.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div id="contact">
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt /> 123 Main Street, Suite 500, Mumbai, India</p>
          <p><FaPhoneAlt /> +91 98765 43210</p>
          <p><FaEnvelope /> support@transithive.com</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>About Transit Hive</h4>
          <p>Your reliable partner in moving and logistics. We ensure a seamless transition with top-notch service quality.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Transit Hive. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
