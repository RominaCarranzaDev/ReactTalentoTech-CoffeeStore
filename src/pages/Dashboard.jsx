// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProductContext } from "../context/ProductContext";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const {
//     productos,
//     loading,
//     error,
//     getAll,
//     deleteItem
//   } = useProductContext();

//   // Cargar productos automáticamente
//   useEffect(() => {
//     getAll();
//   }, []);

//   const handleCreate = () => {
//     navigate("/dashboard/productos/new");
//   };

//   const handleEdit = (id) => {
//     navigate(`/dashboard/productos/${id}/edit`);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

//     await deleteItem(id);
//     getAll(); // refrescar lista
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Gestión de Productos</h2>

//       <button onClick={handleCreate} className="btn-primary">
//         + Crear Nuevo Producto
//       </button>

//       {loading && <p>Cargando productos...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Imagen</th>
//             <th>Nombre</th>
//             <th>Precio</th>
//             <th>Categoría</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>

//         <tbody>
//           {productos?.map((p) => (
//             <tr key={p.id}>
//               <td>
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   width="50"
//                   height="50"
//                   style={{ borderRadius: "8px", objectFit: "cover" }}
//                 />
//               </td>

//               <td>{p.name}</td>
//               <td>${p.price}</td>
//               <td>{p.category}</td>

//               <td>
//                 <button onClick={() => handleEdit(p.id)}>✏ Editar</button>
//                 <button
//                   onClick={() => handleDelete(p.id)}
//                   style={{ marginLeft: "8px" }}
//                 >
//                   🗑 Borrar
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { productos, cargando, error, deleteProduct } = useProductContext();

  const goCreate = () => navigate("/dashboard/product/new");

  const goEdit = (id) => navigate(`/dashboard/product/edit/${id}`);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("¿Seguro que querés eliminar este producto?");

  if (!confirmDelete) return;

  try {
    await deleteProduct(id);
    alert("Producto eliminado con éxito");
  } catch (err) {
    console.error("Error eliminando:", err);
    alert("No se pudo eliminar");
  }
};

  return (
    <div className="dashboard-container">
      <h1>Panel de Administración</h1>

      {/* HEADER ACCIONES */}
      <div className="dashboard-actions">
        <button onClick={goCreate} className="btn btn-create">
          ➕ Crear Producto
        </button>
      </div>

      {/* ESTADOS */}
      {cargando && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {/* TABLA */}
      {!cargando && !error && productos.length > 0 && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    width="50"
                    style={{ borderRadius: "6px" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => goEdit(p.id)}
                  >
                    ✏️ Editar
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
  Eliminar
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!cargando && !error && productos.length === 0 && (
        <p>No hay productos cargados.</p>
      )}
    </div>
  );
}
