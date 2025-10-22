import { useState } from 'react';
import '../styles/styleForm.css'

function FormContact() {
  const [formulario, setFormulario] = useState({
      nombre: '',
      correo: '',
      telefono:'',
      motivo:'',
      mensaje:''
  });

  const manejarCambio = (e) => {
    setFormulario({...formulario, [e.target.name]: e.target.value});
  };

  const handlerEnvio = (e) => {
    e.preventDefault();

    setFormulario({
      nombre: '',
      correo: '',
      telefono:'',
      motivo:'',
      mensaje:''
    });
  };


  return (
    <div className="containerFormContact">
      <h3 className='title'>Contáctanos</h3>
      <form onSubmit={handlerEnvio}>
        <div className='containerInput'>
          <label htmlFor='nombre'><span className="required">*</span> Nombre: </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            placeholder="Tu nombre "
            required
          />
        </div>
       
        <div className='containerInput'>
          <label htmlFor='correo'><span className="required">*</span> Correo: </label>
          <input
            type="email"
            name="correo"
            id="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            placeholder="tu-correo@email.com"
            required
            inputMode='email'
          />
        </div>
        <div className='containerInput'>
          <label htmlFor='telefono'>Telefono: </label>
          <input
            type='text'
            name='telefono'
            id='telefono'
            value={formulario.telefono}
            onChange={manejarCambio}
            placeholder="Tu telefono "
            inputMode='numeric'
          />
        </div>
        <div className='containerInput'>
          <label htmlFor='motivo'>Motivo: </label>
          <select name="motivo" id="motivo"
            value={formulario.motivo}
            onChange={manejarCambio}>
            <option value="otro">Otro motivo</option>
            <option value="sugerencia">Sugerencia</option>
            <option value="reclamo">Reclamo</option>
            <option value="laboral">Trabajar con nosotros</option>
          </select>
        </div>
        <div className='containerInput'>
          <label htmlFor="mensaje"><span className="required">*</span> Tu mensaje</label>
          <textarea name="mensaje" id="mensaje" 
          placeholder='Escribe aquí tu mensaje...' required 
          maxLength={80}
          value={formulario.mensaje}
          onChange={manejarCambio}
          ></textarea>
        </div>
        <button type="submit" className='btn btn-form'>Enviar</button>
      </form>
    </div>
  );
} export default FormContact;