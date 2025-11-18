import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function ProtectedRoute({ children, Admin= false }) {
  const location = useLocation();
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" state={location.state} replace />;
  }
  if (Admin && user.rol !== 'admin'){
    return <Navigate to='/store' />
  }
  return children;
}
export default ProtectedRoute;