import React from 'react';
import styled from 'styled-components';

function MiniCard({title, icon='/vite.svg', text}) {
  return (
    <MiniCardStyled>
        <img src={icon} alt={title} loading='lazy' decoding='async' height='50px' className='img-minicard'/>
        <h3>{title}</h3>
        <p>{text}</p>
    </MiniCardStyled>
  )
} export default MiniCard;

const MiniCardStyled = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius);
  width: 180px;
  min-height: 200px;
  padding: var(--padding);
  text-align: center;

  & img.img-minicard {
   height: 50px;
   color: red;
  }
  & h3 {
  color: var(--color-main);
  margin:.4rem 0;
  }
  & p {
    font-size: .9rem;
  }
`