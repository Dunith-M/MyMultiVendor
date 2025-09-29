// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { getToken, parseJwt } from '../utils/auth';

export default function ProtectedRoute({ children, role }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" />;

  const payload = parseJwt(token);
  if (!payload) return <Navigate to="/login" />;

  if (role && payload.role !== role) return <Navigate to="/login" />;

  return children;
}
