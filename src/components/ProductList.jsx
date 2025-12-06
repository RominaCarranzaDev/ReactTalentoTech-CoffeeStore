import React, {useState} from "react";
import { useProductContext } from "../context/ProductContext.jsx";
import Card from "./Card";
import CardDashboard from "./CardDashboard.jsx";
import Loading from "./Loading.jsx";
import Error from './Error.jsx';
import Btn from './Btn.jsx';
import { BiLeftArrow, BiRightArrow} from "react-icons/bi";
import styled from "styled-components";

function ProductoList({view, selectedProducts = null, itemsPerPage = 12, onEdit, onDelete }) {
  const { productos, loading, error } = useProductContext();
  const [page, setPage] = useState(1);

  if (loading) return <Loading />;
  if (error) return <Error mensaje="Not Found"/>;
  if (!productos) return <Error mensaje="Products Not Found"/>;

  const products = selectedProducts && selectedProducts.length > 0
    ? selectedProducts
    : productos;

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const paginated = products.slice(firstIndex, lastIndex);

  const changePage = (newPage) =>  setPage(newPage);

  return (
     <>
      {view === 'card' ? (
         <ProductsContainer>
         {paginated.map((producto) => (
          <Card key={producto.id} producto={producto} /> ))}
        </ProductsContainer> 
        ) : (
          <ProductsContainer>
            {paginated.map((producto) => (
              <CardDashboard key={producto.id} product={producto} onDelete={onDelete} onEdit={onEdit}/> ))}
          </ProductsContainer>    
        )
      }
      <Paginator>
        <Btn $btn='main' $w disabled={page <= 1} onClick={() => changePage(page - 1)} aria-label='Ir a la sección anterior'>
          <BiLeftArrow />
        </Btn>
        <p> {page} ... {totalPages} </p>
        <Btn $btn='main' $w disabled={page >= totalPages} onClick={() => changePage(page + 1)} aria-label='Ir a la sección siguiente'>
         <BiRightArrow />
        </Btn>
      </Paginator>
    </>
  );
} export default ProductoList;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;

  
  @media (min-width: 700px) {
    flex-direction: row;
    flex-wrap: wrap;
    }
`

const Paginator = styled.div`
  margin: auto;
  margin-top: 15vh;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-items: center;
  border-radius: .3rem;
  background: var(--color-light);
  max-width: 400px;
  padding: .2rem;
  gap: .2rem;


  & button, p {
    background: var(--color-white);
    color: var(--color-dark);
    border: none;
    box-shadow: none;
    width: 100%;
    height: 100%;
    text-align: center;
    padding:.3rem;
    border-radius: .3rem
  }

  button:disabled {
  opacity: .6;
  cursor: not-allowed;
  color: var(--color-ghost);
}
`
