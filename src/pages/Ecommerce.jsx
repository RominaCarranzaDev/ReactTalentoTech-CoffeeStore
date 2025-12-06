import { useState, useEffect } from 'react';
import { useCartContext } from '../context/CartContext';
import { useProductContext } from '../context/ProductContext.jsx';
import Carrito from '../components/Carrito';
import ProductoList from '../components/ProductList';
import Loading from "../components/Loading.jsx";
import Error from '../components/Error.jsx';
import { BiCartAlt } from "react-icons/bi";
import styled from 'styled-components';
import SearchingBar from '../components/SearchingBar.jsx';
import FilterBar from '../components/FilterBar.jsx';

function Layout({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}

function Ecommerce() {
  const { productos, loading, error } = useProductContext();
  const { carrito, totalProductos } = useCartContext();  
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todos");

  useEffect(() => {
    document.title = "Dolce Vita Caffé | Tienda";
   
    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Descubrí Dolce Vita, donde el café se vive. Café de especialidad, pastelería artesanal y un refugio pensado para disfrutar aromas, sabores y momentos únicos.');
    updateMetaTag('keywords', 'Dolce Vita, cafeteria, coffee store, amantes del café, café de calidad, granos seleccionados');
    updateMetaTag('author', 'Romina Carranza');
    updateMetaTag('robots', 'index, follow');

    updateMetaTag('og:title', 'Coffee Store | Dolce Vita Caffé', 'property');
    updateMetaTag('og:description', 'En Dolce Vita transformamos cada taza de café en una experiencia. Aromas intensos, sabor auténtico y un espacio pensado para disfrutar el ritual del buen café.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', `https://tudominio.com/`, 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error mensaje="Not Found"/>;
  if (!productos) return <Error mensaje="Products Not Found"/>;

  const productosFiltrados = productos.filter(p =>
      categoria === "todos" ? true : p.category.toLowerCase() === categoria
      ).filter(p =>
      search.trim() === "" ? true : p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', gap: '1rem', position: 'relative', padding:'5vh', paddingBottom: '0'}}>
        <h1 className='title'>Tu pausa perfecta empieza acá</h1>
        <BtnCart onClick={() => setMostrarCarrito(!mostrarCarrito)} aria-label='Despliegue del carrito lateral'>
            <BiCartAlt /> {carrito.length > 0 && (<span>{totalProductos}</span>)}
        </BtnCart>
        {mostrarCarrito && (
          <Carrito mostrar={mostrarCarrito} cerrar={() => setMostrarCarrito(false)} />
        )}
      </div>
      <div className="topBar flex column" style={{padding:'5vh', gap: '1rem', alignItems:'start'}}>
        <SearchingBar onResults={setSearch} />
        <FilterBar onFilters={setCategoria} />
      </div>  
      {(search || categoria !== "todos") && (
        <ProductsContainer>
          <h2 className='title'>Resultados encontrados:</h2>
          {productosFiltrados.length > 0 ? (
            <ProductoList view="card" selectedProducts={productosFiltrados} itemsPerPage={4}/>
          ) : (
            <Error mensaje='No se encontraron productos...' />
          )}
        </ProductsContainer>
      )}
        <ProductsContainer>
          <h2 className="title">Nuestro Menú</h2>
          <ProductoList view="card"  itemsPerPage={12}/>
        </ProductsContainer> 
    </Layout>
  );
} export default Ecommerce;

const ProductsContainer = styled.section`
  padding: var(--padding);
  background: var(--color-white);
  padding-bottom: 15vh;
  padding-top: 10vh;
  border-bottom: 3px double var(--color-main);

 & .container-products {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    align-items: center;
    justify-content: center;
 }

`
const BtnCart = styled.button`
    font-size: 2rem;
    position: relative;

    & span {
      background-color: var(--color-main);
      font-size: .8rem;
      font-weight: 600;
      position: absolute;
      top: -8px;
      right: 2px;
      border-radius: var(--border-radius);
      padding: 4px;
      width: max-content;
    }
`