// client/src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { apiLogin, apiRegister, parseJwt, setToken, getToken, removeToken } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, role, ... } or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({ id: payload.id, role: payload.role });
      } else {
        removeToken();
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const data = await apiLogin(email, password);
    setToken(data.token);
    const payload = parseJwt(data.token);
    setUser({ id: payload.id, role: payload.role });
    return data;
  }

  async function register(form) {
    const data = await apiRegister(form);
    return data;
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export { AuthContext };