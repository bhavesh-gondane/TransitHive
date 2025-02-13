import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import '../styles/Navbar.css';

const Navbar = ({ hideLinks }) => {
  const [showModal, setShowModal] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  // Check if the current path is one of the dashboard pages
  const isDashboardPage = location.pathname.includes('dashboard');
  const isProfilePage = location.pathname.includes('profile');
  const isPaymentPage = location.pathname.includes('success');

  return (
    <div>
      <nav className="navbar navbar-expand-lg" id='nav_color'>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand fw-bold fs-3 text-white" href="/">
            <h3 id="logo_nav">TransitHive</h3>
          </a>

          {/* Navbar toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isNavbarOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links (conditionally rendered based on hideLinks prop) */}
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            {!hideLinks && (
              <ul className="navbar-nav d-flex flex-lg-row flex-column mx-auto">
                <li className="nav-item mx-3">
                  <a className="nav-link text-white" href="/">HOME</a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link text-white" href="#about-us">ABOUT US</a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link text-white" href="#testimonials">TESTIMONIALS</a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link text-white" href="#contact">CONTACT US</a>
                </li>
              </ul>
            )}
          </div>

          {/* Show Login button only if the current page is NOT a Dashboard page */}
          {(!isDashboardPage && !isProfilePage && !isPaymentPage) && (
            <button onClick={() => navigate('/login/user')} className="btn btn-outline-warning ms-3">
              Login
            </button>

          )}
          {(!isDashboardPage && !isProfilePage && !isPaymentPage ) && (
            <button onClick={handleShowModal} className="btn btn-outline-warning ms-3">
              register
            </button>

          )}
          {(isPaymentPage ) && (
            <button onClick={() => navigate('/dashboard/user')} className="btn btn-outline-warning ms-3">
              Go to Dashboard
            </button>

          )}
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>
            <h3>Register as</h3>
            <button className="btn btn-success my-2" onClick={() => navigate('/register/vendor')}>JOIN AS SERVICE PROVIDER</button>
            <button className="btn btn-info my-2" onClick={() => navigate('/register/user')}>REGISTER AS CUSTOMER</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
