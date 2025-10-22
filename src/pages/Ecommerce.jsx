import { useContext, useState } from 'react';
import Carrito from '../components/Carrito';
import ProductoList from '../components/ProductList';
import '../styles/Product.css';
import { useAppContext } from '../context/AppContext';

function Layout({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}

function Ecommerce() {
  const {carrito, totalProductos } = useAppContext();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productosCargados, setProductosCargados] = useState(false);
  
  return (
    <Layout>
      {productosCargados && (
        <button className='btn-cart'
          onClick={() => setMostrarCarrito(!mostrarCarrito)}><i className='bx bx-shopping-bag'></i> 
          {carrito.length > 0 && (
            <span className='count-cart'>{totalProductos}</span>
          )}
        </button>
      )}

      <ProductoList onLoaded={setProductosCargados}/>
      
      {mostrarCarrito && (
        <Carrito 
        mostrar={mostrarCarrito} 
        cerrar={() => setMostrarCarrito(false)} />
      )}
      
    </Layout>
  );
} export default Ecommerce;