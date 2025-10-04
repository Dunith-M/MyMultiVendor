// client/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const userString = localStorage.getItem('user');
  if (!userString) return <Navigate to="/login" replace />;
  try {
    const user = JSON.parse(userString);
    if (!user || user.role !== 'admin') return <Navigate to="/" replace />;
    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
}
