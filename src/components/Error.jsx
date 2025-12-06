import React from 'react'
import ErrorPng from '../assets/error.png'
import styled from 'styled-components'

function Error({mensaje='Error'}) {
  return (
    <ErrorMsg>
      <p>{mensaje}</p>
      <img src={ErrorPng} alt={`Imagen de error: ${mensaje}`} />
    </ErrorMsg>
  )
} export default Error;

const ErrorMsg = styled.div`
    padding: var(--padding);
    text-align: center;
    font-size: 1.8rem;
    color: var(--color-ghost);
    max-width: 280px;
    margin: 0 auto;

   &  img {
    filter: blur(.3px) brightness(0.85) drop-shadow(0 0 8px var(--color-shadow));    
    max-width: 80%;
  }
`