import { useProductContext } from "../context/ProductContext.jsx";
import Card from "./Card";
import Loading from "./Loading.jsx";
import ErrorLoading from './ErrorLoading.jsx';


function ProductoList({view}) {
  const { productos, loading, error } = useProductContext();

  if (loading) return <Loading />;
  if (error) return <ErrorLoading />;
  
  return (
    <div className="product-list">
      {view === 'card' ? 
        (<>
        <h2 className='title'>Nuestro Menú</h2>
        <div className="container-product-list flex">
            {productos.map((producto) => (
                <Card key={producto.id} producto={producto} />
            ))}
        </div>
        </>) : (
          <div >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td className='line-clamp' title={p.description}>{p.description}</td>
              <td>
                <img src={p.image} alt={p.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>)}
    </div>
  );
}
export default ProductoList;