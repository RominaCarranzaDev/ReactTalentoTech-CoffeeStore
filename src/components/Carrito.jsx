import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import '../styles/Cart.css'

function Carrito({ mostrar, cerrar }) {
    const navigate = useNavigate();
    const {carrito, agregarAlCarrito, vaciarCarrito, eliminarProducto, restarAlCarrito, total } = useCartContext();

    const confirmarCompra = () => {
      navigate('/login', { state: {carrito} });
    };

    return (
      <section className={`carrito ${mostrar ? "abierto" : ""}`}>
        <h2 className='title'><i className='bx bx-shopping-bag'></i> Carrito de Compras </h2>
        <button className="cerrar" onClick={cerrar}><i className='bx bx-x'></i></button>
        {carrito.length === 0 && (
          <div className="carrito-mensaje cart-empty"><p>El carrito está vacío</p></div>
        )}

        {carrito.length > 0 && (
          <div className="container-carrito flex column">
              <ul className="container-carrito-items flex">
              {carrito.map((producto) => (
                  <li key={producto.id} className="carrito-item">
                      <span className="carrito-item-name">{producto.name}</span>
                      <span className="carrito-item-price">Precio: ${producto.price}</span>
                      <span className="carrito-item-quantity flex space-b">Cantidad: 
                        <button onClick={() => restarAlCarrito(producto.id)}><i className='bx bx-minus btn-quantity'></i></button>
                        {producto.quantity}  
                        <button onClick={() => agregarAlCarrito(producto)}><i className='bx bx-plus btn-quantity'></i></button>
                      </span>
                      <span className="carrito-item-subtotal">SubTotal: ${((parseFloat(producto.price)) * producto.quantity).toFixed(2)}</span>
                      <button className='carrito-item-delete' onClick={() => eliminarProducto(producto)}><i className='bx bx-trash-alt'></i> </button>
                  </li>
              ))}
              </ul>
              <p className='total'>Total: ${total}</p>
              <div className="botonera flex">
                <button onClick={confirmarCompra} className="btn">Confirmar Compra</button>
                <button onClick={vaciarCarrito} className="btn btn-out" >Vaciar Carrito</button>
              </div>
          </div>)}
      </section>
    );
} export default Carrito