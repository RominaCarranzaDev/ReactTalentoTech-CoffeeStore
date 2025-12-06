import coffeeGif from "../assets/Coffee_love.gif";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingStyled>
      <img src={coffeeGif} alt="loading" />
      <p>Aguardá.</p>
      <p>Estamos buscando los mejores cafés para ti
        <span className="point-loading">.</span>
        <span className="point-loading">.</span>
        <span className="point-loading">.</span>
     </p>
    </LoadingStyled>
  );
} export default Loading;

const LoadingStyled = styled.div`
  height: 50vh;
  color: var(--color-main);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.4rem;

  & img {
    width: 140px;
    display: block;
  }
  
  & .point-loading {
    display: inline-block;
    animation: bounce 1.2s infinite;
  }
  & .point-loading:nth-child(2) {
  animation-delay: .2s;
  }
  & .point-loading:nth-child(3) {
  animation-delay: .4s;
  }

`
