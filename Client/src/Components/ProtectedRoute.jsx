// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  // 'user' might be stored as a JSON string in localStorage when the user logs in

  if (!token || !userData) {
    // Not logged in at all
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(userData);
  if (user.role !== requiredRole) {
    // Logged in, but not an admin
    return <Navigate to="/" />;
  }

  // If role matches, render the children
  return children;
};

export default ProtectedRoute;
