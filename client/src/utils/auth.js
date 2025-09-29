// src/utils/auth.js

// Register user
export async function register(form) {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Register failed');
  return data;
}

// Login user & save token
export async function login(email, password) {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');

  // store token locally
  localStorage.setItem('token', data.token);
  const payload = parseJwt(data.token);
  localStorage.setItem('role', payload.role);

  return data;
}

// Decode JWT (not secure, just for quick role checks client-side)
export function parseJwt(token) {
  try {
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

// Helper: get token
export function getToken() {
  return localStorage.getItem('token');
}
