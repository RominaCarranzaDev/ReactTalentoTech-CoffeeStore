import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import { useProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";

export default function FormProduct({ mode = "create"}) {
  const { id } = useParams();
const isEdit = Boolean(id);

  const { createProduct, updateProduct, getProductId, loading, error } = useProductContext();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: ""
  });

  const [validFields, setValidFields] = useState({});
  const [loadingInitial, setLoadingInitial] = useState(true);
if (!formData) return <p>Cargando...</p>
  // AUTOCARGA al editar
  useEffect(() => {
    if (!isEdit) {
      setLoadingInitial(false);
      return;
    }

    const fetchData = async () => {
      try {
        const product = await getProductId(id);
        setFormData(product);
      } catch (err) {
        console.error("Error cargando producto:", err);
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchData();
  }, [isEdit, id]);

  // actualiza campos
  const handleValidChange = (name, value, isValid) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidFields((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allValid = Object.values(validFields).every(Boolean);

    if (!allValid) {
      alert("Hay errores o campos incompletos");
      return;
    }

    try {
      if (isEdit) {
        await updateProduct( id, formData);
        alert("Producto actualizado correctamente");
      } else {
        await createProduct( formData );
        alert("Producto creado correctamente");
      }
    } catch {
      alert("Error al guardar.");
    }
  };

  if (loadingInitial) return <p>Cargando datos...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Editar Producto" : "Crear Producto"}</h2>

      <FormField
        name="name"
        label="Nombre"
        required
        check={["textShort"]}
        value={formData.name}
        onValidChange={handleValidChange}
      />

      <FormField
        name="price"
        label="Precio"
        fieldType="number"
        check={["price"]}
        required
        value={formData.price}
        onValidChange={handleValidChange}
      />

      <FormField
        name="stock"
        label="Stock"
        fieldType="number"
        check={["number"]}
        required
        value={formData.stock}
        onValidChange={handleValidChange}
      />

      <FormField
        name="category"
        label="Categoría"
        required
        check={["textShort"]}
        value={formData.category}
        onValidChange={handleValidChange}
      />

      <FormField
        name="image"
        label="URL de Imagen"
        fieldType="url"
        check={["url"]}
        required
        value={formData.image}
        onValidChange={handleValidChange}
      />

      <FormField
        name="description"
        label="Descripción"
        fieldType="text"
        check={["nameLong"]}
        value={formData.description}
        onValidChange={handleValidChange}
      />

      <button type="submit" disabled={loading}>
        {isEdit ? "Actualizar Producto" : "Crear Producto"}
      </button>

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
    </form>
  );
}
