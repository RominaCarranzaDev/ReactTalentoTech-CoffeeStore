import React from 'react'
import { Link } from 'react-router-dom';
import Btn from '../components/Btn';
import styled from 'styled-components';

function Hero() {
  return (
    <HeroSection>
      <picture>
        <source srcSet='/bg-main-mobile.webp' media="(max-width: 700px)"/>
        <source srcSet='/bg-main.webp' media="(min-width: 701px)"/>
        <img src='/bg-main.webp' alt="Imagen principal del sitio"
          fetchPriority="high"
          decoding="async"
          loading="eager"
          width="900"
          height="500"
        />
      </picture>
      <h1>Dolce Vita Caffé</h1>
      <p>Un aroma, un sorbo, un momento... <br />Respirá. Disfrutá. ¡Viví el café!</p>
      <Btn as={Link} to="/store" $btn="main" $w>
        Regalate un instante
      </Btn>
    </HeroSection>
)
}
 export default Hero;

const HeroSection = styled.section`
  position: relative;
  width: 100vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  overflow:hidden;

  & h1 {
    font-family: var(--font-cursive);
    font-size: 2.2rem;
    font-weight: 800;
    text-align: center;
    color: var(--color-white); 
    text-shadow:
    -2px -2px 0 var(--color-primary),
    2px -2px 0 var(--color-primary),
    -2px 2px 0 var(--color-primary),
    2px 2px 0 var(--color-primary);
    height: 3rem;
  }

  & p {
    background-color: var(--color-light);
    padding: 8px 16px;
    border-radius: .8rem 0 ;
    box-shadow: 2px 2px 10px var(--color-shadow);
    font-style: italic;
    font-weight: 600;
    min-height: 2rem;
  }
   & a {
   margin: 0;
   align-self: start;
   }

   & img {
    object-fit: cover;
    width:100%;
    height: 100%;
    position: absolute;
    inset: 0;
    z-index: -1 ;
   }


  @media (min-width: 700px) {
   & p {
    width: max-content;
   }
  }
`
