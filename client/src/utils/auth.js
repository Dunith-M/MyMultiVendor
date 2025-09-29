// client/src/utils/auth.js
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiRegister(form) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || (data.errors && data.errors[0]?.msg) || 'Register failed');
  return data;
}

export async function apiLogin(email, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || (data.errors && data.errors[0]?.msg) || 'Login failed');
  return data;
}

export function parseJwt(token) {
  try {
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}


/**
 * helper to call APIs with auth header and auto-throw on 401
 */
export async function apiFetch(path, opts = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (res.status === 401) {
    // token invalid/expired — let UI handle by logging out or redirecting
    throw new Error('Unauthorized');
  }
  const data = await res.json().catch(()=> ({}));
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}