// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    // optional: show unauthorized page or redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}
