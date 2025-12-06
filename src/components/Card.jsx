import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from '../context/CartContext';
import { BiInfoCircle, BiCartAdd, BiEditAlt, BiTrash } from "react-icons/bi";
import Btn from './Btn';
import styled from "styled-components";

function CardProducto({producto}) {
  const { agregarAlCarrito } = useCartContext();

  return (
    <Card>
      <div className="card-image-wrapper">
        <Link to={`/store/product/${producto.id}`} 
          state={{ producto }}
          aria-label={`Ver detalles de ${producto.name}`}>
          <BiInfoCircle className="details-icon" />
          <img src={producto.image} alt={producto.name} loading="lazy"className='card-img' />
        </Link>
      </div>

      <div className="card-content">
        <h3>{producto.name}</h3>
        <p>$ {parseFloat(producto.price).toFixed(2)}</p>
        <Btn $btn='main'
          aria-label={`Agregar ${producto.nombre} al pedido`}
          onClick={() => agregarAlCarrito(producto)}>
          <BiCartAdd /> Pedir
        </Btn>
      </div>
    </Card>
  );
} export default CardProducto;

const Card = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  width: clamp(20vw, 200px, 100%);
  min-height: 360px; 
  margin: 0 auto; 

  &:hover {
    transform: translateY(-3px);
  }

  & .card-image-wrapper {
  position: relative;
  }

  & .card-img {
  width: 100%;
  height: 220px;
  }

  & svg.details-icon {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: .5rem;
  right: .5rem;
  color: var(--color-main);
  opacity: 0;
  transition: all .3s ease;
  }

  .card-image-wrapper:hover svg.details-icon {
  opacity: 1;
  transform: scale(1.1);
  }

  & .card-content {
  padding: var(--padding);
  } & h3 {
    margin-bottom: .5rem;
    text-transform: capitalize;
    color: var(--color-primary);
    height: 3rem;
    } & p {
    font-weight: 600;
    margin-bottom: .4rem;  
    }


`