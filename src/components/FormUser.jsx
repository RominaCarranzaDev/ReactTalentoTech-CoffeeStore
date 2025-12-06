import { useState } from "react";
import FormField from "./FormField";
import { toast } from "react-toastify";
import Btn from "./Btn";
import styled from "styled-components";

export default function FormUser({ mode = "login", onSubmit, onSwap }) {

  const [formData, setFormData] = useState(
    mode === "login"
      ? { email: "", password: "" }
      : { fullname: "", email: "", password: "", repeatPassword: "", rol: "client" }
  );

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "register" && formData.password !== formData.repeatPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <div className="form-header">
        <img src="../src/assets/logo.png" alt="icono" />      
        {mode === "login" ?
          (<>
            <h2>Un buen día empieza con un buen café</h2>
            <p>Bienvenido de nuevo. <br />Inicia sesión para continuar.</p>
          </>) 
          : (<>
            <h2>Únete a nuestra familia.</h2>
            <p>Crea tu cuenta para empezar a disfrutar la experiencia del buen café.</p>
          </>)
        }
      </div>
    <form onSubmit={handleSubmit}>
      {mode === "register" && (
        <FormField
          id="nombre"
          name="nombre"
          label="Nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onValid={handleChange}
          required
          check={'textShort'}
        />
      )}
      <FormField
        fieldType="email"
        id="email-register"
        name="email"
        label="Email"
        placeholder="correo-electronico@email.com"
        value={formData.email}
        onValid={handleChange}
        required
      />
      <FormField
        fieldType="password"
        id="password-register"
        name="password"
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        value={formData.password}
        onValid={handleChange}
        required
      />
      {mode === 'login' && (
        <>
          <Modal id="modal">
            <p>En breve recibirás un correo electrónico de recuperación.</p>
            <Btn $btn='main' $w onClick={() => document.getElementById("modal").close()}>Cerrar</Btn>
          </Modal>

          <Btn $btn='alt' $w onClick={() => document.getElementById("modal").showModal()}>
            ¿Olvidaste tu contraseña?
          </Btn>
        </>)
      }
      {mode === "register" && (
        <FormField
          fieldType="password"
          id="repeatPassword"
          name="repeatPassword"
          label="Repetir Contraseña"
          placeholder="Repita su contraseña"
          value={formData.repeatPassword}
          onValid={handleChange}
          required
        />
      )}
      <p>(*) Campos obligatorios</p>
      <Btn type="submit" $btn='main'>
        {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
      </Btn>
     
     
      {mode === "login" && (
        <BtnEnlace>
          <span>¿Aún no eres parte de la comunidad? </span>
          <Btn $btn='alt' $w type="button" onClick={onSwap}>
            Regístrate aqui
          </Btn>
        </BtnEnlace>)}
      {mode === "register" && (
        <BtnEnlace>
          <span>¿Ya tienes una cuenta? </span>
          <Btn $btn='alt' $w type="button" onClick={onSwap}>
            Inicia sesión
          </Btn>
        </BtnEnlace>)}
       
    </form>
    {mode === 'login' && (
      <p className="flex column">
      Credenciales Fake de Prueba 
      <span>Email: admin@email.com</span> 
      <span>Contraseña: admin1234</span>
      </p>)
      }
    </FormContainer>
  );
}

const FormContainer =  styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5vh;

  & .form-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2vh;
  align-items: center;
  text-align: center;
  }

  & .form-header img {
  width: 100px;
  }

  & form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3vh;
  }
`
const BtnEnlace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  `

const Modal = styled.dialog`
    padding: 2rem;
    border: none;
    border-radius: 1rem;
    box-shadow: 0 0 8px var(--color-light);
    margin: auto;
    font-size: 1rem;

  ::backdrop {
  background: rgba(0,0,0,.5);
  }

  & p {
  margin-bottom: 2rem;
  }


`