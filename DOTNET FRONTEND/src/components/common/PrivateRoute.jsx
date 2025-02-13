import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to={`/login/${role}`} state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = `/dashboard/${user.role}`;
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default PrivateRoute;