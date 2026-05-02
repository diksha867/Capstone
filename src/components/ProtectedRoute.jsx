import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles = ['user'] }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
