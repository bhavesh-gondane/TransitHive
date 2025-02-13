import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaUsers, 
  FaTruck, 
  FaBookmark, 
  FaSignOutAlt,
  FaBars,
  FaTachometerAlt,
  FaTimes,
  FaBoxes,
  FaMoneyBillWave,
  FaComments
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    const currentPath = location.pathname;
    if (path === '/dashboard/admin' && currentPath === '/dashboard/admin') {
      return true;
    }
    return currentPath.startsWith(`/dashboard/admin/${path}`);
  };

  const menuItems = [
    { path: '/dashboard/admin', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: 'users', icon: FaUsers, label: 'Users' },
    { path: 'vendors', icon: FaTruck, label: 'Vendors' },
    { path: 'bookings', icon: FaBookmark, label: 'Bookings' },
    { path: 'items', icon: FaBoxes, label: 'Items Management' },
    { path: 'payments', icon: FaMoneyBillWave, label: 'Payments' },
    { path: 'reviews', icon: FaComments, label: 'Reviews' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="mobile-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        <FaBars size={24} />
      </button>

      <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <a onClick={handleLogout} style={{ cursor: 'pointer' }}><h3 className="sidebar-title">TransitHive</h3></a>
          <button
            className="close-sidebar"
            onClick={toggleSidebar}
            aria-label="Close Menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path === '/dashboard/admin' ? item.path : `/dashboard/admin/${item.path}`}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
          
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            <div className="nav-link">
              <FaSignOutAlt className="nav-icon" />
              <span className="nav-label">Logout</span>
            </div>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;