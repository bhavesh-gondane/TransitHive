import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin-dash.css';

function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AdminDashboard;