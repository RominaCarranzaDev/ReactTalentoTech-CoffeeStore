// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuthContext } from '../context/AuthContext';
// import '../styles/styleForm.css'

// function Login() {
//   const navigate = useNavigate();
//   const ubicacion = useLocation();
//   const { iniciarSesion, isAuthenticated, user } = useAuthContext();
//   const [formulario, setFormulario] = useState({email: "", password: ""});

//   useEffect(() => {
//       if (isAuthenticated && user) {
//         if (user.rol === "admin") {
//           navigate("/dashboard");
//         } else if (ubicacion.state?.carrito) {
//           navigate("/cart", { state: { carrito: ubicacion.state.carrito } });
//         } else {
//           navigate("/store");
//         }
//       }
//     }, [isAuthenticated, user, navigate]);

//   const manejarEnvio = (e) => {
//     e.preventDefault();
//     const { email, password } = formulario;
    
//     const resultado = iniciarSesion(email, password);
//       if (!resultado.success) {
//         alert(resultado.message)
//     }
//     const usuario = resultado.user;
//       if (usuario.type === "admin") {
//         navigate("/dashboard");
//       } else if (location.state?.carrito) {
//         navigate("/cart", { state: { carrito: location.state.carrito } });
//       } else {
//         navigate("/store");
//       }
//     };


//   return (
//     <>
//     <div className='containerFormLogin flex'>
//       <h2>Iniciar sesión</h2>
//       <form onSubmit={manejarEnvio} className='formLogin flex'>
//         <input
//           type="email"
//           placeholder="Email"
//           value={formulario.email}
//           onChange={(e) => setFormulario({...formulario, email: e.target.value})}
//           required
//           inputMode='email'
//         />
//         <input
//           type="password"
//           placeholder="Clave"
//           value={formulario.password}
//           onChange={(e) => setFormulario({...formulario, password: e.target.value})}
//           required
//           inputMode='password'
//         />
//         <button type="submit" className='btn'>Iniciar Sesión</button>
//       </form>
//     </div>
//     </>
//   );
// }
// export default Login;

// pages/Login.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import FormUser from "../components/FormUser";

export default function Login() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const { iniciarSesion, isAuthenticated, user, crearUsuario } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.rol === "admin") {
        navigate("/dashboard");
      } else if (ubicacion.state?.carrito) {
        navigate("/cart", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/store");
      }
    }
  }, [isAuthenticated, user]);

  // LOGIN
  const manejarLogin = async (formData) => {
    const resultado = await iniciarSesion(formData.email, formData.password);

    if (!resultado.success) {
      alert(resultado.message);
      return;
    }
    // redirección queda manejada por el useEffect
  };

  // REGISTER
  const manejarRegister = async (formData) => {
    const result = await crearUsuario(formData);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Usuario registrado con éxito. Ahora puede iniciar sesión.");
  };

  return (
    <div className="containerFormLogin flex">
      <FormUser mode="login" onSubmit={manejarLogin} />
      <FormUser mode="register" onSubmit={manejarRegister} />
    </div>
  );
}

