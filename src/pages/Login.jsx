import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import '../styles/styleForm.css'

function Login() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const { iniciarSesion, isAuthenticated, user } = useAuthContext();
  const [formulario, setFormulario] = useState({email: "", password: ""});

  useEffect(() => {
      if (isAuthenticated && user) {
        if (user.type === "admin") {
          navigate("/dashboard");
        } else if (ubicacion.state?.carrito) {
          navigate("/cart", { state: { carrito: ubicacion.state.carrito } });
        } else {
          navigate("/store");
        }
      }
    }, [isAuthenticated, user, navigate]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const { email, password } = formulario;
    
    const resultado = iniciarSesion(email, password);
    const usuario = resultado.user;

    if (usuario.type === "admin") {
      navigate("/dashboard");
    } else if (location.state?.carrito) {
      navigate("/cart", { state: { carrito: location.state.carrito } });
    } else {
      navigate("/store");
    }
  };


  return (
    <>
    <div className='containerFormLogin flex'>
      <h2>Iniciar sesión</h2>
      <form onSubmit={manejarEnvio} className='formLogin flex'>
        <input
          type="email"
          placeholder="Email"
          value={formulario.email}
          onChange={(e) => setFormulario({...formulario, email: e.target.value})}
          required
          inputMode='email'
        />
        <input
          type="password"
          placeholder="Clave"
          value={formulario.password}
          onChange={(e) => setFormulario({...formulario, password: e.target.value})}
          required
          inputMode='password'
        />
        <button type="submit" className='btn'>Iniciar Sesión</button>
      </form>
    </div>
    </>
  );
}
export default Login;