import React ,{ useState, useEffect} from 'react'
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Error from '../components/Error';
import Loading from  '../components/Loading';
import Btn from '../components/Btn';
import { useProductContext } from '../context/ProductContext';
import { BiShare } from "react-icons/bi";import styled from 'styled-components';


function DetailProduct() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProductId }= useProductContext();
  const productoState = location.state?.producto;
  const [producto, setProducto] = useState(productoState || null);
  const [loading, setLoading] = useState(!productoState);
 
useEffect(() => {
    if (productoState) return;

    async function fetchProduct() {
      try {
        const data = await getProductId(id);
        setProducto(data);
      } catch (err) {
        setProducto(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <main><Loading /></main>

  return (
  <main>
    {!producto ? (
      <section>
        <Btn $btn="main" onClick={() => navigate('/store')} $w>
          <PiArrowBendDoubleUpLeft /> Volver a la tienda
        </Btn>
        <Error mensaje="Product Not Found" />
      </section>
    ) : (
      <DetailProd>
        <div className="detail-header">
          <h1 className="title">Detalles del Producto:</h1>
          <p><strong>Cod:</strong> #{producto.id}</p>
          <h2>{producto.name}</h2>
        </div>
        
        <img
          src={producto.image}
          alt={producto.name}
          className="detail-img"
        />
        <div className="detail-det">
          <h3 className="detail-cat">{producto.category}</h3>
          <p className="detail-price"><strong>Precio:</strong> ${producto.price}</p>
        </div>
        <p className="detail-desc">
          <strong>Descripción: </strong>
          {producto.description}
        </p>
        <Btn $btn='main' onClick={()=> {navigate('/store')}}>
          <BiShare /> Volver a la Tienda
        </Btn>
      </DetailProd>
    )}
  </main>
);
} export default DetailProduct;

const DetailProd = styled.div`
  display: grid;
  grid-template-columns: 1fr; 
  grid-template-rows: auto 1fr;
  gap: 5vh;
  max-width: 900px;
  margin: auto;
  padding: 5vh 10vw;

  & img {
    max-width: clamp(180px, 260px, 220px);
    margin: auto;
    border-radius: .8rem;
  }

  @media (min-width: 700px) {
    .detail-header { grid-area: 1 / 1 / 2 / 3 }
    .detail-img { grid-area: 1 / 3 / 5 / 4 }
    .detail-det { grid-area: 2 / 1 / 3 / 3 }
    .detail-desc { grid-area: 3 / 1 / 4 / 3 }
    }
   
`