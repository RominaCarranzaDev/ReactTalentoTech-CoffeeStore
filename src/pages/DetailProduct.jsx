import React from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import '../styles/styleDetailProd.css'
import ErrorLoading from '../components/ErrorLoading';

function DetailProduct() {
  const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;
 
  if (!producto) {
    return (
      <div>
        <Link to="/store" className='btn btn-back'>
          <i className='bx bx-reply'></i> Volver a la Tienda
        </Link>
        <ErrorLoading />
      </div>
    );
  }
 
  return(
    <div className='containerDetailProd'>
      <p>Cod: #{producto.id}</p>
      <h2 className='title detail-title'> {producto.name} </h2>
      <img src={producto.image} alt={producto.name} className='detail-img' />
      <div className='detail-det flex'>
        <p className='detail-price'>Precio: ${producto.price}</p> 
        <h3 className='detail-cat'>{producto.category}</h3> 
      </div>
          
      <p className='detail-desc'><strong>Descripción: </strong>{producto.description}</p>
      <Link to={`/store`} className='btn detail-btn-return'><i className='bx bx-reply-big' ></i> Volver</Link>
    
    </div>
  );
}

export default DetailProduct