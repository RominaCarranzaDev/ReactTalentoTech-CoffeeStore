import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

function ProtectedRoute({ children, Admin= false }) {
  const location = useLocation();
  const { user, loading } = useAuthContext();

  if (loading) { <Loading />}
  
  if (!user) {
    return <Navigate to="/login" state={location.state} replace />;
  }
  if (Admin && user.rol !== 'admin'){
    return <Navigate to='/store' />
  }
  return children;
}
export default ProtectedRoute;