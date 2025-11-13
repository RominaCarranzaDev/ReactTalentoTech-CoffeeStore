import React, { createContext, useContext, useState, useEffect } from "react";
import { Users } from '../dataJSON/Users';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const crearFakeToken = (userId, username) => {
    // const base = Math.random().toString(36).substring(2, 15);
      return `fake-token-${userId}-${username}`;
  };


  const iniciarSesion = (email, password) => {
    const foundUser = Users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const userData = {
        name: foundUser.fullname,
        email: foundUser.email,
        type: foundUser.type
      };

      // Crear token simulado
      const fakeToken = crearFakeToken(foundUser.id, foundUser.fullname);

      localStorage.setItem("authUser", JSON.stringify(userData));
      localStorage.setItem("authToken", fakeToken);

      setUser(userData);
      setToken(fakeToken);

      return { success: true, user: userData, token: fakeToken };
    }
    return { success: false, message: "Correo o contraseña incorrectos" };
  };


  const cerrarSesion = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  };


  const value = {
    user,
    token,
    iniciarSesion,
    cerrarSesion,
    isAuthenticated: !!user && !!token,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}