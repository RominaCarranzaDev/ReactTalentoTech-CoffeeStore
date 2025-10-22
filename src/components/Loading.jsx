import "../styles/styleLoading.css"
import coffeeGif from "../assets/Coffee_love.gif";

function Loading() {
  return (
    <div className="loading">
      <img src={coffeeGif} alt="loading" />
      <p>Aguardá.</p>
      <p>Estamos buscando los mejores cafés para ti
        <span className="point-loading">.</span>
        <span className="point-loading">.</span>
        <span className="point-loading">.</span>
     </p>
    </div>
  );
}

export default Loading;
