import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import'../styles/Card.css'


function CardProducto({producto}) {
  const { agregarAlCarrito } = useAppContext();

  return (
    <div className="card">
      <Link to={`/store/product/${producto.id}`} state={{producto}}>
        <img className='card-img'src={producto.image} alt={producto.name} loading="lazy"/>
      </Link>
      <div className="card-content">
        <h3 className="card-title">{producto.name}</h3>
        <p>$ {parseFloat(producto.price).toFixed(2)}</p>
        <button className="btn flex" onClick={() => agregarAlCarrito(producto)}><i className='bx  bx-cart-plus'  ></i> Agregar al Carrito</button>
      </div>
    </div>
  );
}
export default CardProducto;
