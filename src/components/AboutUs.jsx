import React from 'react'
import MiniCard from './MiniCard'
import Review from './Review'
import styled from 'styled-components';
import CoffeeTime from '../assets/coffee-time.webp';

function AboutUs() {
  return (
    <>
        <IntroContainer>
            <h2 className='title'>El café no se toma, se vive.</h2>
            <p><strong className='highlight'>Dolce Vita</strong> es un refugio para los amantes del buen café. Un lugar donde el aroma, el sabor y el tiempo encuentran su equilibrio. Cada sorbo celebra la pausa, el detalle y la pasión artesanal de un buen café. <br />Te invitamos a detenerte un momento, a disfrutar el ritual, y a descubrir el verdadero sabor de la <strong className='highlight'>Dolce Vita.</strong></p>
            <ImagenPublic src={CoffeeTime} alt="Imagen encuentro con amigos" loading='lazy' decoding="async" width='300px'/>
        </IntroContainer>
        <section>
            <h2 className='title'>Nuestra Filosofía</h2>
            <p>Transformar cada taza en una experiencia. Desde el grano cuidadosamente seleccionado para resaltar sus notas más delicadas hasta la ultima gota que llega a tu taza. <br />Cada paso es un acto de pasión y dedicación, respetando los tiempos, las texturas y la esencia de su origen. Porque para nosotros, el arte del café no está solo en su aroma… está en el instante que te regala. 
            <br /> Vení y compartí con nosotros el amor por el buen café. Te invitamos a probar esta experiencia única.</p>
        </section>
        <CardMiniContainer>
            <MiniCard 
                title='Lugar Tranquilo' 
                icon='/relax.svg'
                text='Un espacio de calma para relajarte, trabajar o disfrutar la pausa.' />
            <MiniCard 
                title='Granos de Calidad'
                icon='/coffee-beans.svg'
                text='Seleccionamos los mejores granos de origen único.' />
            <MiniCard
                title='Crea Tu Sabor'
                icon='/coffee-beans-.svg'
                text='Personaliza tu café con nuestras increíbles opciones.' />
            <MiniCard
                title='Nuestra Comunidad'
                icon='/group.svg'
                text='Un punto de encuentro para amantes del buen café.' />

        </CardMiniContainer>
        <section>
            <h3 className='title'>Ya probaste nuestro café?</h3>
            <p>¿Todavia no? Te invito a conocer que dicen nuestros clientes de la experiencia que vivieron en <span className='highlight'> Dolce Vita</span>.<br />Vení, probá una taza para que sientas ese aroma intenso y el sabor suave que te acompañará durante todo el día.</p> 
            <ReviewContainer>
                <Review fullname='Pam Villa' 
                    imagen='/user-woman.svg'
                    review='Sutil y elegante. Con notas florales y frutadas. Ideal para acompañar con algo dulce y liviano.'/>
                <Review fullname='Damian Betu'
                    review='¡Delicioso! Aromático, con notas dulces a caramelo. Te abraza con un buen postre.'/>
                <Review fullname='Ova Grosso'
                    review='Café muy bien tratado. Buena acidez, notas limpias y retrogusto a cacao.' />
            </ReviewContainer>
        </section>

    </>
   
  )
} export default AboutUs;

const CardMiniContainer = styled.section`
    display: flex;
    gap: 20px;
    justify-content: space-evenly;
    flex-wrap: wrap;
    background: var(--color-white);
    position: relative;
    z-index: 2;
    padding: 10vh 8vw;

    &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--color-primary);
    z-index: -1;
    clip-path: polygon(0 5%, 100% 0%, 100% 95%, 0% 100%);
    }

    @media (min-width: 700px) {
    padding: 18vh 8vw;
    &::before {
        clip-path: polygon(0 15%, 100% 0%, 100% 85%, 0% 100%);
    }
`
const ReviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 3vh;
    padding: var(--padding);
    margin: 5vh auto;
`
const ImagenPublic = styled.img`
    width: 280px;
    border-radius: var(--border-radius);
    margin: 8vh auto;
`
const IntroContainer = styled.section`
    display: grid;
    align-items: center;
    column-gap: 8vw; 

    @media (min-width: 700px) {
        & h2 {
        grid-column: 1/3
        }
         & img {
         grid-column: 2 /3;
         margin: 0;
         }
    }
`