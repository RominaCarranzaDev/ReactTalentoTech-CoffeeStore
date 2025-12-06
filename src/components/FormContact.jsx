import { useState } from 'react';
import FormField from './FormField';
import { URL_FORMSPREE } from '../config/AppConfig';
import { toast } from 'react-toastify';
import Btn from './Btn';
import styled from 'styled-components';
import ImgForm from '../assets/for-two.jpg';

function ContactoForm() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    motivo: "otro",
    mensaje: "",
  });
  const [fieldValid, setFieldValid] = useState({});

  const handleValidChange = (name, value, isValid) => {
    console.log(form)  
  
  setForm(prev => ({
    ...prev,
    [name]: value
  }));
  setFieldValid(prev => ({
    ...prev,
    [name]: isValid
  }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
    const allValid =  Object.values(fieldValid).every(v => v === true); 


  if (!allValid) {
    toast.error("Por favor completá correctamente los campos obligatorios.");
    return;
  }

    const form = new FormData(e.target);
    try {
      const response = await fetch(URL_FORMSPREE, {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        toast.success("Tu mensaje fue enviado correctamente ");
      } else {
        console.log("error API FormSpree");
        toast.error("Ocurrió un error al enviar el mensaje.");
      }
    } catch (error) {
      console.log("error API FormSpree");
      toast.error("Error de conexión. Intenta nuevamente.");
    }
  }

  return (
    <FormContact>
    <form onSubmit={handleSubmit}>
      <FormField
        fieldType='text'
        name="nombre"
        id="nombre"
        label='Nombre'
        value={form.nombre}
        placeholder="Tu nombre"
        required
        onValid={handleValidChange}
      />
      <FormField
        fieldType="email"
        name="correo"
        id="correo"
        label='Correo electrónico'
        value={form.correo}
        placeholder="tu-correo@email.com"
        required
        onValid={handleValidChange}
      />
      <FormField
        fieldType='text'
        name='telefono'
        id='telefono'
        label='Teléfono'
        value={form.telefono}
        placeholder="Tu teléfono"
        inputMode='numeric'
        onValid={handleValidChange}
      /> 
      <FormField
        fieldType='select'
        name="motivo"
        id="motivo"
        value={form.motivo}
        label='Motivo'
        options={[
          { value:"otro", label:"Otro motivo"},
          { value:"reserva", label:"Reservar un mesa"},
          { value:"sugerencia", label:"Sugerencia"},
          { value:"reclamo", label:"Reclamo"},
          { value:"laboral", label:"Trabajar con nosotros"}
        ]}
        onValid={handleValidChange}
      />
      <FormField
        fieldType='textarea'
        name="mensaje"
        id="mensaje"
        label='Mensaje'
        placeholder='Escribe aquí tu mensaje...'
        maxLength={180}
        required
        value={form.mensaje}
        onValid={handleValidChange}
        check={'maxLength'}
      />
      <p>(*) Campos obligatorios</p>

      <Btn type="submit" $btn='main'>
        Enviar mensaje
      </Btn>

    </form>
    <div className='form-img'></div>
    </FormContact>
  );
} export default ContactoForm;

const FormContact = styled.div`
  padding: 5vh;
  background: var(--color-gradient);
  width:100%;
  border-radius: var(--border-radius);
  box-shadow: 0 0 18px 8px var(--color-ghost);

  & form {
  width: clamp( 220px, 70vw, 350px);
  margin: 0 auto;
  padding: 5vh 3vw;
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  }

  & label {
  color: var(--color-white);
  }
  & .form-field {
  margin-bottom: 1.2rem;
  }
  & p {
  color: var(--color-light);
  margin-bottom: 2rem;
  font-size: small;
  }

@media (min-width: 700px) {
  display: flex;
  justify-content: space-between;
  padding: 0;

    & form {
  margin: 5vh 8vw;
  }

  & .form-img {
  flex-grow:1;
  background: url('${ImgForm}') no-repeat center;
  background-size: cover;
  border-radius: 0 .8rem .8rem 0 ;
  }
}
`