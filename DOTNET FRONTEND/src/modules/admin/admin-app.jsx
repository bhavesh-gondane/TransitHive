import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/dashboard/DashboardStats';
import UsersList from './components/users/UsersList';
import VendorTabs from './components/vendors/VendorTabs';
import BookingsList from './components/bookings/BookingsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './admindash.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardStats />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/vendors" element={<VendorTabs />} />
            <Route path="/bookings" element={<BookingsList />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
