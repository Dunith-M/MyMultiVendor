// src/pages/Login.jsx
import { useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(email, password);
      alert('✅ Login successful!');
      // Redirect based on role
      if (data.user.role === 'admin') navigate('/admin/dashboard');
      else if (data.user.role === 'seller') navigate('/seller/dashboard');
      else navigate('/customer/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-sm mx-auto">
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full"/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full"/>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
