import React from 'react'
import styled from 'styled-components';

function Review({fullname='Anónimo', imagen='/user-man.svg', review}) {

  return (
    <CardReview>
        <div className="review-header">
            <img src={imagen} alt={`Foto de ${fullname}`} loading='lazy' decoding='async' width='5rem'/>
        </div>
        <div className="review-body">
            <h4>{fullname}</h4>
            <p>{review}</p>
        </div>
    </CardReview>

  )
} export default Review;

const CardReview = styled.div`
  width: 180px;
  border: 1px solid var(--color-light);
  border-radius: var(--border-radius);
  position: relative;
  margin: 0 auto;

  & .review-header {
    background : var(--color-gradient);
    border: 1px solid var(--color-light);
    border-radius: .8rem .8rem 0 0;
    height: 15vh;
  }
  & img {
   width: 5rem;
   clip-path: circle();
   position: absolute;
   top: 6vh;
   right: 1rem;
   background: var(--color-white);
  }

  & .review-body {
    padding: var(--padding);
    padding-top: 2rem;
  }
  & .review-body h4 {
    color: var(--color-primary);
    font-weight: 700;
    margin-bottom: 1rem;
  }
`