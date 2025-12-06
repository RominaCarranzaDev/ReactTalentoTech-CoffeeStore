import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import ErrorPng from '../components/Error';
import Btn from './Btn';
import { BiSolidCoffeeAlt, BiTrash } from "react-icons/bi";
import styled from 'styled-components';

function Carrito({ mostrar, cerrar }) {
    const navigate = useNavigate();
    const {carrito, agregarAlCarrito, vaciarCarrito, eliminarProducto, restarAlCarrito, total } = useCartContext();

    const confirmarCompra = () => {
      navigate('/login', { state: {carrito} });
    };

    return (
      <CartAside className={`carrito ${mostrar ? "abierto" : ""}`}>
        <h2 className='title'><BiSolidCoffeeAlt  /> Pedido</h2>
        <BtnClose aria-label='Cerrar el carrito lateral' onClick={cerrar}>x</BtnClose>
        { carrito.length === 0 ? 
          (<><ErrorPng mensaje='Todavia no has hecho un pedido.'/>
            <Btn $btn='main' $w  onClick={cerrar}>Ver menú</Btn>
          </>)
          : (
            <CartContainer>
                <CartItems>
                {carrito.map((producto) => (
                    <CartItem key={producto.id}>
                        <span className="carrito-item-name">{producto.name}</span>
                        <span className="carrito-item-price">Precio: ${producto.price}</span>
                        <span className="carrito-item-quantity flex space-b">Cantidad: 
                          <button onClick={() => restarAlCarrito(producto.id)} className='btn-quantity' aria-label='restar una unidad al pedido'>-</button>
                          {producto.quantity}  
                          <button onClick={() => agregarAlCarrito(producto)} className='btn-quantity' aria-label='sumar una unidad al pedido'>+</button>
                        </span>
                        <span className="carrito-item-subtotal">SubTotal:  ${((parseFloat(producto.price)) * producto.quantity).toFixed(2)}</span>
                        <button className='carrito-item-delete' onClick={() => eliminarProducto(producto)}><BiTrash /></button>
                    </CartItem>
                ))}
                </CartItems>
                <p className='total'>Total: ${total}</p>
                <div className="botonera">
                  <Btn $btn='main' onClick={confirmarCompra}>Confirmar Compra</Btn>
                  <Btn $btn='out' onClick={vaciarCarrito}>Vaciar Carrito</Btn>
                </div>
            </CartContainer>
            )
        }  
      </CartAside>
    );
} export default Carrito;
const CartAside = styled.div`
    min-height: 100vh ;
    max-width: 320px;
    padding: var(--padding);
    box-shadow: -3px 3px 8px 5px var(--color-shadow);
    position: fixed;
    top: 0;
    right: 300px;
    background: var(--color-white);
    transform: translateX(100%);
    transition: all .5s ease;
    z-index: 1000;

  &.abierto {
    transform: translateX(0);
    right: 0;
    transition: all .5s ease;
}
  }
`

const CartContainer = styled.div`
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .total {
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: var(--padding);
    background-color: var(--color-secondary);
    border-radius: var(--border-radius);
}
`
const CartItems = styled.ul`
    height: 65vh;
    width: 100%;
    overflow-y: auto;
    background: var(--color-secondary);
    border-radius: var(--border-radius);
    padding: .2rem;
`
const CartItem = styled.li`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "name name"
        "price delete"
        "quantity ."
        "subtotal subtotal";
    border: 1px solid var(--color-light);
    padding: .5rem;
    width: 100%;
    background-color: var(--color-white);
    border-radius: .6rem;
    margin-bottom:.2rem;

  &  .carrito-item-name {
    grid-area: name;
    font-weight: bold;
    text-transform: capitalize;
    border-bottom: 1px solid var(--color-secondary);
    margin-bottom: .5rem;
  }
  & .carrito-item-delete {
      grid-area: delete;
      justify-self: end;
      font-size: 1.2rem;
  }
  & .carrito-item-price {
      grid-area: price;
  }
  & .carrito-item-quantity {
      grid-area: quantity;
  }
  & .carrito-item-subtotal {
      grid-area: subtotal;
      text-align: end;
      background-color: var(--color-light);
      font-weight: 500;
      border-radius: .4rem;
  }
`
const BtnClose = styled.button`
  position: absolute;
  top: .1rem;
  right: 1rem;
  font-size: 1.8rem;
`