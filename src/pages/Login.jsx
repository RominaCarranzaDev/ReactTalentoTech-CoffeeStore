import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import FormUser from "../components/FormUser";
import ImgForm from "../assets/coffee.jpg";
import { toast } from "react-toastify";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const { iniciarSesion, isAuthenticated, user, crearUsuario } = useAuthContext();
  const [flipped, setFlipped] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      if (ubicacion.state?.carrito) {
        navigate("/cart", { state: { carrito: ubicacion.state.carrito } });
      } else if (user.rol === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/store");
      }
    }
  }, [isAuthenticated, user]);

  const handleLogin = async (formData) => {
    const result = await iniciarSesion(formData.email, formData.password);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
  };

  const handleRegister = async (formData) => {
    const result = await crearUsuario(formData);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Usuario registrado con éxito. Ahora puede iniciar sesión.");
  };

  return (
    <main>
      <FormAccessContainer>
      {/* <FormUser mode="login" onSubmit={handleLogin} />
      <FormUser mode="register" onSubmit={handleRegister} /> */}
       <div className="flip-container">
        <div className={`flip-card ${flipped ? "flipped" : ""}`}>
          <div className="front">
            <FormUser mode="login"
              onSubmit={handleLogin}
              onSwap={() => setFlipped(true)}
            />
          </div>
          <div className="back">
            <FormUser mode="register"
              onSubmit={handleRegister}
              onSwap={() => setFlipped(false)}
            />
          </div>
        </div>
      </div>
      <div className="auth-image"></div>
    </FormAccessContainer>
    </main>
  );
} export default Login;

const FormAccessContainer = styled.section`
  display: flex;

  & .flip-container {
  width: clamp(280px ,500px, 50%);
  height: 700px;
  perspective: 1000px;
  margin: auto;
}
  & .flip-card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform .5s ease;
  transform-style: preserve-3d;
}
& .flip-card.flipped {
  transform: rotateY(180deg);
}
  & .front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
}
  & .back {
  transform: rotateY(180deg);
}
 & .auth-image {
    display: none;
    width: 40%;
    background: red url(${ImgForm});
    background-size: cover;
    background-position: center;
  }

@media (min-width: 700px) {
  & .auth-image {
    display: block;
  }
  & .flip-container {
  height: 780px;
}
}
`