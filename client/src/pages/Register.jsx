// client/src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    // basic front-end validation
    if (!form.name || !form.email || form.password.length < 6) {
      setError('Please fill name, valid email, and password (min 6 chars).');
      return;
    }
    try {
      setLoading(true);
      const res = await register(form);
      setLoading(false);
      // If seller, backend usually sets status pending — show message and redirect to login.
      alert(res.message || 'Registered — proceed to login');
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <label className="block mb-2">
          <span className="text-sm">Name</span>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                 className="mt-1 block w-full border rounded p-2" />
        </label>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                 className="mt-1 block w-full border rounded p-2" />
        </label>

        <label className="block mb-2">
          <span className="text-sm">Password</span>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                 className="mt-1 block w-full border rounded p-2" />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Role</span>
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="mt-1 block w-full border rounded p-2">
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </label>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  );
}
