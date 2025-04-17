// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location.pathname, message: 'Please log in to access your cart.' }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
