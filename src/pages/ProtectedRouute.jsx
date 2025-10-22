import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const {isAuthenticated} = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={location.state} replace />;
  }
  return children;
}
export default ProtectedRoute;