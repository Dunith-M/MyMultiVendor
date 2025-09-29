import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute role="admin"><h1>Admin Dashboard</h1></ProtectedRoute>}
        />
        <Route
          path="/seller/dashboard"
          element={<ProtectedRoute role="seller"><h1>Seller Dashboard</h1></ProtectedRoute>}
        />
        <Route
          path="/customer/dashboard"
          element={<ProtectedRoute role="customer"><h1>Customer Dashboard</h1></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
