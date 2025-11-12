import React from 'react';
import { Navigate } from 'react-router-dom';

// Assuming this component is in src/components/ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  // Check for authentication status (must match how you set auth on login)
  const isAuthenticated = localStorage.getItem('username'); 

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the child component (e.g., <Feed /> or <Profile />) if authenticated
  return children;
};

export default ProtectedRoute;