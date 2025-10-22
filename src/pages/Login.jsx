import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/styleForm.css'

function Login() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const [formulario, setFormulario] = useState({ email: '', password: '' });

  const {isAuthenticated, setIsAuthenticated, setUser, user} = useAppContext();

  useEffect(() => {
    if (isAuthenticated) {
      if (ubicacion.state?.carrito) {
        navigate("/cart", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/store");
      }
    }
  }, [isAuthenticated, navigate, ubicacion.state]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (formulario.email && formulario.password) {
      setIsAuthenticated(true);
      setUser(formulario);
      console.log(user)
      // if (ubicacion.state?.carrito) {
      //   navigate('/cart', { state: { carrito: ubicacion.state.carrito } });
      // } else {
      //   navigate('/store');
      // }
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