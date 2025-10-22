import Products from '../database/Products.jsx'
import Card from "./Card";
import { useEffect } from "react";
import Loading from "./Loading.jsx";
import ErrorLoading from './ErrorLoading.jsx';


function ProductoList({onLoaded}) {
  const { products, loading, error } = Products();
  
  useEffect(() => {
    if (!loading && !error && products.length > 0) {
      onLoaded?.(true);
    } else if (error) {
      onLoaded?.(false);
    }
  }, [loading, error, products, onLoaded]);

  if (loading) return <Loading />;
  if (error) return <ErrorLoading />;
  
  return (
    <section className="product-list">
        <h2 className='title'>Nuestro Menú</h2>
        <div className="container-product-list flex">
            {products.map((producto) => (
                <Card key={producto.id} producto={producto} />
            ))}
        </div>
    </section>
  );
}
export default ProductoList;