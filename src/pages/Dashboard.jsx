import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { productos, cargando, error, deleteProduct } = useProductContext();

  const handleCreate = () => navigate("/dashboard/product/new");

  const handleEdit = (id) => navigate(`/dashboard/product/edit/${id}`);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
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
      <div className="dashboard-actions">
        <button onClick={handleCreate} className="btn btn-create">
           Crear Producto
        </button>
      </div>
      {cargando && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}> {error}</p>}

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
                    onClick={() => handleEdit(p.id)}
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
