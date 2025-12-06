import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { BiShare, BiTrash } from "react-icons/bi";
import Error from '../components/Error';
import Btn from '../components/Btn';
import styled from 'styled-components';

function Cart() {
  const navigate = useNavigate();
  const {carrito, agregarAlCarrito, restarAlCarrito, vaciarCarrito, eliminarProducto, total, totalProductos } = useCartContext();

  function pagar() {
    vaciarCarrito()
    navigate("/payment", { state: { carrito } })
  }

  return ( 
    <main>
      {carrito.length > 0 ? (
        <section>
          <h2 className='title'>Tu carrito</h2>
          <CartContainer>
            <div className="cart-items">
              {carrito.map((producto) => (
              <div className="cart-item" key={producto.id}>
                <img src={producto.image} alt={producto.name} className='cart-image'/>
                <h3>{producto.name}</h3>
                <p className='flex space-b'>
                  <span>$ {producto.price}</span>x 
                  <span className="item-quantity flex">
                    <BtnQuantity onClick={() => restarAlCarrito(producto.id)} className='btn-quantity'>-</BtnQuantity>
                    {producto.quantity}  
                    <BtnQuantity onClick={() => agregarAlCarrito(producto)} className='btn-quantity'>+</BtnQuantity>
                  </span>
                </p>
                <p className="flex space-b"><strong>Subtotal:</strong> ${((parseFloat(producto.price)) * producto.quantity).toFixed(2)}</p>

                <Btn $btn='alt' $w className='btn-delete' onClick={() => eliminarProducto(producto)}><BiTrash /> Eliminar</Btn>
              </div>
              ))}
            </div>
            <div className="cart-resume flex column">
              <p className='flex space-b'>Productos: ({totalProductos}) <span>$ {total}</span></p>
              <p className='flex space-b'>Envío: <span>$8.000</span></p>
              <p className='cart-resume-total flex space-b'><span>Total a pagar:</span> ${(parseFloat(Number((total)).toFixed(2)) + 8000).toFixed(2)}</p>
              <Btn $btn='main' onClick={ pagar }>Pagar</Btn>
              <Btn onClick={() => navigate("/store")}>Cancelar</Btn>
            </div>
          </CartContainer>
        </section>
      ) : (
        <section className="cart-empty flex column">
          <Error mensaje='Todavia no has hecho un pedido'/>
          <Btn $btn='main' $w  onClick={() => navigate("/store")} >
            <BiShare /> Ir a la tienda
          </Btn>
        </section>
      )}
    </main>    
  );
} export default Cart;

const CartContainer = styled.div`
    width: 100%;

    & .cart-item {
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-primary);
    display: flex;
    flex-direction: column;
    gap: .2rem;
  }
  & .cart-item img {
    width: 100%;
    max-width: 120px;
    border-radius: .8rem 0 0 0;
  }
    & .item-quantity {
    gap:.6rem;
    font-size: 1.2rem;
    }
  & .cart-resume {
    position: sticky;
    bottom: 0;
    width: 100%;
    background: var(--color-white);
    box-shadow: 0px -8px 8px var(--color-white);
    gap: .2rem;
  }
   & .cart-resume p {
   width: 100%;
   }
   & .cart-resume-total {
   font-size: larger;
    font-weight: bold;
    margin-bottom: 1rem;
 }
    & .btn-delete {
    display: flex;
    gap: .3rem;
    align-self: end;
    margin: 0;
    padding: 0;
    }

 @media (min-width: 700px) {
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: start;
  gap: 5vw;
 }
`

const BtnQuantity =styled.button`
    font-weight: 600;
    font-size: large;
    gap: .2rem;
`