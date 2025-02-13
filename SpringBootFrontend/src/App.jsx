import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ResponsiveLayout from './components/layout/ResponsiveLayout';
import PrivateRoute from './components/common/PrivateRoute';
import UserLogin from './modules/auth/UserLogin';
import VendorLogin from './modules/auth/VendorLogin';
import AdminLogin from './modules/auth/AdminLogin';
import UserRegister from './modules/auth/UserRegister';
import VendorRegister from './modules/auth/VendorRegister';
import AdminRegister from './modules/auth/AdminRegister';
import UserDashboard from './modules/user/UserDashboard';
import VendorDashboard from './modules/vendor/VendorDashboard';
import AdminDashboard from './modules/admin/AdminDashboard';
import AdminRoutes from './routes/AdminRoutes';
import ForgotPassword from './modules/auth/ForgotPassword';
import ResetPassword from './modules/auth/ResetPassword';
import BookingForm from './modules/booking/BookingForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/GlobalStyles.css';
import HomePage from './modules/landing/HomePage';
import PaymentSuccess from './modules/user/components/Success';
import VendorSucess from './modules/vendor/components/vendorsucess';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ResponsiveLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login/user" element={<UserLogin />} />
            <Route path="/login/vendor" element={<VendorLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/register/user" element={<UserRegister />} />
            <Route path="/register/vendor" element={<VendorRegister />} />
            <Route path="/register/admin" element={<AdminRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} /> {/* Adjusted Route */}
            
            <Route path="/success" element={<PaymentSuccess/>}/>
            <Route path="/vendorsuccess" element={<VendorSucess/>}/>
            
            <Route path="/booking" element={
              <PrivateRoute role="USER">
                <BookingForm />
              </PrivateRoute>
            } />
            
            <Route path="/dashboard/user" element={
              <PrivateRoute role="USER">
                <UserDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/dashboard/vendor" element={
              <PrivateRoute role="VENDOR">
                <VendorDashboard />
              </PrivateRoute>
            } />

            <Route path="/dashboard/admin/*" element={
              <PrivateRoute role="ADMIN">
                <AdminRoutes />
              </PrivateRoute>
            } />
          </Routes>
        </ResponsiveLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;