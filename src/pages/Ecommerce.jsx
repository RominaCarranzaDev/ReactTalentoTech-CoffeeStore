import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import Carrito from '../components/Carrito';
import ProductoList from '../components/ProductList';
import '../styles/Product.css';

function Layout({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}

function Ecommerce() {
  const {carrito, totalProductos } = useCartContext();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  
  return (
    <Layout>
        <button className='btn-cart'
          onClick={() => setMostrarCarrito(!mostrarCarrito)}><i className='bx bx-shopping-bag'></i> 
          {carrito.length > 0 && (
            <span className='count-cart'>{totalProductos}</span>
          )}
        </button>
    
      <ProductoList view={'card'} />
      
      {mostrarCarrito && (
        <Carrito 
        mostrar={mostrarCarrito} 
        cerrar={() => setMostrarCarrito(false)} />
      )}
      
    </Layout>
  );
} export default Ecommerce;