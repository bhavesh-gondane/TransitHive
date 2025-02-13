import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import '../styles/Navbar.css';

const NavbarForBookForm = ({ hideLinks }) => {
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

  const handleBack = () => {
    navigate('/dashboard/user');
  };

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

          

          {/* Show Login button only if the current page is NOT a Dashboard page */}
          {(!isDashboardPage && !isProfilePage) && (
            <button onClick={handleBack} className="btn btn-outline-warning ms-3">
              User-Home
            </button>
          )}
        </div>
      </nav>

      
    </div>
  );
};

export default NavbarForBookForm;
