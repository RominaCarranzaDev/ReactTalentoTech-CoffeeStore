import React from 'react'
import FormContact from '../components/FormContact';
import styled from 'styled-components';

function ContactUs() {
  const ubicaciones = [
    { sucursal:'Dolce Vita Calle Falsa',
      direccion: 'Calle Falsa 123',
      telefono:'0303456',
      celular:'15 1234 5678',
      horario: 'Lunes a Viernes de 8 a 20hs',
      mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4214.076539165482!2d-58.37750632372096!3d-34.60911578543425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccadb57fd1e5f%3A0xcc737c4eb0a8614b!2sPlaza%20de%20Mayo!5e0!3m2!1ses!2sar!4v1764104547056!5m2!1ses!2sar'
    },
    { sucursal:'Dolce Vita Av. SiempreViva',
      direccion: 'Av. SiempreViva 742',
      telefono:'4321100',
      celular:'11 2233 4400',
      horario: 'Lunes a Viernes de 8 a 20hs',
      mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0182801980454!2d-58.384177125369064!3d-34.60369925749534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses!2sar!4v1764104336192!5m2!1ses!2sar'
    }
  ]
  return (
    <main>
      <section>
        <h1 className='title'>Comunicate con nosotros </h1>
        <FormContact />
      </section>
      <section>
        <h2 className='title'>Nos encontramos en:</h2>
        <div className="flex">
        {ubicaciones.map((u, index) => (
          <CardLocation key={index}>
            <h3>{u.sucursal}</h3>
            <p><strong>Dir:</strong> {u.direccion}</p>
            <p><strong>Tel:</strong> {u.telefono}</p>
            <p><strong>Cel:</strong> {u.celular}</p>
            <p><strong>Horario:</strong> {u.horario}</p>

            <div className="map flex">
              <iframe
                src={u.mapa}
                width="240px"
                height="200"
                style={{ border: 0, margin:'0 auto' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </CardLocation>
        ))}
        </div>
      </section>
    </main>
  )
} export default ContactUs;

const CardLocation = styled.div`
  background: var(--color-white);
  margin: 5vh ;

  & h3 {
  color: var(--color-main);
  font-weight: 800;
  margin-bottom: .8rem;
  }
  & p {
  margin-bottom: .4rem;
  }
  & .map {
  margin: 2rem auto;
  }
`