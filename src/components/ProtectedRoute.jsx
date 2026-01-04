import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Adjust the path if needed

const ProtectedRoute = ({ role, children }) => {
  const { token, userRole } = useContext(AuthContext);

  if (!token) {
    // If no token, redirect to sign-in page
    return <Navigate to="/signin" />;
  }

  if (role && role !== userRole) {
    // If the role doesn't match, redirect to a "not authorized" page or home
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
