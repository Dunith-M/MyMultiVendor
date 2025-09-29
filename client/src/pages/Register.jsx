// src/pages/Register.jsx
import { useState } from 'react';
import { register } from '../utils/auth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form);
      alert('✅ Registered successfully! Now login.');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-sm mx-auto">
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 w-full"/>
      <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 w-full"/>
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="border p-2 w-full"/>
      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="border p-2 w-full">
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
      </select>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
