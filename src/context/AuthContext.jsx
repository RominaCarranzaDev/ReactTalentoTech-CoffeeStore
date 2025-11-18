import React, { createContext, useContext, useState, useEffect } from "react";
import { Users } from '../dataJSON/Users';
import { ENDPOINT } from "../config/AppConfig";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const URL_USERS = ENDPOINT.usuarios

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

  const iniciarSesion = async (email, password) => {
    
    try {
      const data = await fetch(URL_USERS);
      const users = await data.json();
      const foundUser = users.find(
        u => u.email === email && u.password === password
        );
      if (!foundUser) {
      return { success: false, message: "Correo o contraseña incorrectos" };
      }
      
      const userData = {
      name: foundUser.fullname,
      email: foundUser.email,
      rol: foundUser.rol,
      };

      const fakeToken = crearFakeToken(foundUser.id, foundUser.fullname);

      localStorage.setItem("authUser", JSON.stringify(userData));
      localStorage.setItem("authToken", fakeToken);

      setUser(userData);
      setToken(fakeToken);

        return { success: true, user: userData, token: fakeToken };
      } catch (err) {
      console.error("Error al iniciar sesion:", err);
      return { success: false, message: "Error inesperado al iniciar sesión" };
      }
    }

  const cerrarSesion = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  };

   const crearUsuario = async (newUser) => {
    try {
      const res = await fetch(URL_USERS);
      const users = await res.json();

      if (users.some(u => u.email === newUser.email)) {
        return { success: false, message: "El email ya está registrado" };
      }

      const userToCreate = {
        fullname: newUser.nombre,
        email: newUser.email,
        password: newUser.password,
        rol: "client",
      };

      const post = await fetch(URL_USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToCreate),
      });

      const createdUser = await post.json();

      return { success: true, user: createdUser };

    } catch (err) {
      console.error("Error creando usuario:", err);
      return { success: false, message: "Error de conexión con la API" };
    }
  };
  const value = {
    user,
    token,
    iniciarSesion,
    cerrarSesion,
    crearUsuario,
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