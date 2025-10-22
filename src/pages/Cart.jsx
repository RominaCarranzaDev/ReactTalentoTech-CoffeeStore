import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/Cart.css'

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const {carrito, agregarAlCarrito, restarAlCarrito, vaciarCarrito, eliminarProducto, total, totalProductos } = useAppContext();

  function pagar() {
    vaciarCarrito()
    navigate("/payment", { state: { carrito } })
  }

  return ( 
    <>
      {carrito.length > 0 ? (
        <div style={{padding:'5vw'}}>
          <h2 className='title' style={{alignSelf:'start', width:'100%'}}>Tu carrito</h2>
        <div className="cart flex column">
          
          <div className="cart-items">
            {carrito.map((producto) => (
            <div className="cart-item" key={producto.id}>
              <img src={producto.image} alt={producto.name} className='cart-image'/>
              <h3 className="cart-title">{producto.name}</h3>
              <button className='cart-delete' onClick={() => eliminarProducto(producto)}>Eliminar</button>
              <p className='flex space-b'><span className="item-quantity">Cantidad: 
                  <button onClick={() => restarAlCarrito(producto.id)}><i className='bx bx-minus btn-quantity'></i></button>
                  {producto.quantity}  
                  <button onClick={() => agregarAlCarrito(producto)}><i className='bx bx-plus btn-quantity'></i></button>
                </span>
                <span className=""> ${((parseFloat(producto.price)) * producto.quantity).toFixed(2)}</span>
              </p>
            </div>
            ))}
          </div>
          <div className="cart-resume flex column">
            <p className='flex space-b'>Productos: ({totalProductos}) <span>$ {total}</span></p>
            <p className='flex space-b'>Envío: <span>$8.000</span></p>
            <p className='title-min'>Total a pagar: ${Number(total)+ 8000}</p>
            <button className="btn btn100" onClick={ pagar }>
            Pagar
            </button>
            <button className="btn btn-out btn100" onClick={() => navigate("/store")}>
            Cancelar
            </button>
          </div>
        </div>
        </div>
      ) : (
        <div className="carrito-mensaje cart-empty">
        <p>El carrito está vacío</p>
        <button className="btn" onClick={() => navigate("/store")} >
        Volver a la tienda
        </button>
        </div>
      )}
    </>    
  );
} export default Cart