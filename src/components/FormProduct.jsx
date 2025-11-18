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
        id="name"
        label="Nombre: "
        required
        check={["textShort"]}
        value={formData.name}
        onValidChange={handleValidChange}
        autoFocus
      />

      <FormField
        name="price"
        id="price"
        label="Precio: "
        fieldType="number"
        check={["price"]}
        required
        placeholder="999,99"
        value={formData.price}
        onValidChange={handleValidChange}
      />

      <FormField
        name="stock"
        label="Stock: "
        fieldType="number"
        check={["number"]}
        required
        value={formData.stock}
        onValidChange={handleValidChange}
      />

      <FormField
        fieldType="select"
        name="category"
        id="category"
        label="Categoría: "
        required
        value={formData.category}
        onValidChange={handleValidChange}
        placeholder="Seleccione ... "
        options={[
                { value: "bebida", label: "Bebida" },
                { value: "postre", label: "Postre" },
                { value: "sandwich", label: "Sandwich" },
            ]}
      />

      <FormField
        fieldType="url"
        name="image"
        label="URL de Imagen:"
        check={["url"]}
        required
        value={formData.image}
        onValidChange={handleValidChange}
        placeholder="https://sitio-ejemplo.com/foto.jpg"
      />

      <FormField
        fieldType="textarea"
        name="description"
        id="description"
        label="Descripción"
        check={["nameLong"]}
        value={formData.description}
        onValidChange={handleValidChange}
        placeholder="Ingrese una breve descripción. Máximo de 150 caracteres."
        maxLength={150}
      />

      <button type="submit" disabled={loading} className="btn">
        {isEdit ? "Actualizar Producto" : "Crear Producto"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
