import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/GlobalStyles.css';

const ResponsiveLayout = ({ children }) => {
  useEffect(() => {
    // Update viewport height for mobile browsers
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);

    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  return (
    <div className="responsive-layout">
      <div className="container">
        {children}
      </div>
    </div>
  );
};

ResponsiveLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResponsiveLayout;