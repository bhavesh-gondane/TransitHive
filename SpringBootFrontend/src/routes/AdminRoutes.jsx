import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../modules/admin/AdminDashboard';
import UsersList from '../modules/admin/users/UsersList';
import VendorTabs from '../modules/admin/vendors/VendorTabs';
import BookingsList from '../modules/admin/bookings/BookingsList';
import DashboardStats from '../modules/admin/dashboard/DashboardStats';
import ItemsManagement from '../modules/admin/items/ItemsManagement';
import PaymentsList from '../modules/admin/payments/PaymentsList';
import ReviewsList from '../modules/admin/reviews/ReviewsList';

const AdminRoutes = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login/admin" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<DashboardStats />} />
        <Route path="users" element={<UsersList />} />
        <Route path="vendors" element={<VendorTabs />} />
        <Route path="bookings" element={<BookingsList />} />
        <Route path="items/*" element={<ItemsManagement />} />
        <Route path="payments" element={<PaymentsList />} />
        <Route path="reviews" element={<ReviewsList />} />
        <Route path="*" element={<Navigate to="/dashboard/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;