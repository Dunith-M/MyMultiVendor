// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>
      } />

      <Route path="/seller/dashboard" element={
        <ProtectedRoute role="seller"><SellerDashboard/></ProtectedRoute>
      } />

      <Route path="/customer/dashboard" element={
        <ProtectedRoute role="customer"><CustomerDashboard/></ProtectedRoute>
      } />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
