import { useState } from "react";
import FormField from "./FormField";

export default function FormUser({ mode = "login", onSubmit }) {

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
      alert("Las contraseñas no coinciden");
      return;
    }
  
    onSubmit(formData);
  };

  return (<div className="containerForm">
    <h2>{mode === "login" ? 'LOGIN': 'REGISTRO' }</h2>
    <form onSubmit={handleSubmit} className="">
      {mode === "register" && (
        <FormField
          id="nombre"
          name="nombre"
          label="Nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onValidChange={handleChange}
          required
          check={'textShort'}
        />
      )}
      <FormField
        fieldType="email"
        id="email"
        name="email"
        label="Email"
        placeholder="correo-electronico@email.com"
        value={formData.email}
        onValidChange={handleChange}
        required
      />
      <FormField
        fieldType="password"
        id="password"
        name="password"
        label="Clave"
        placeholder="Ingrese su clave"
        value={formData.password}
        onValidChange={handleChange}
        required
      />
      {mode === "register" && (
        <FormField
          fieldType="password"
          id="repeatPassword"
          name="repeatPassword"
          label="Repetir Clave"
          placeholder="Repita su clave"
          value={formData.repeatPassword}
          onValidChange={handleChange}
          required
        />
      )}

      <button type="submit" className="btn">
        {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
      </button>

    </form>
    </div>
  );
}
