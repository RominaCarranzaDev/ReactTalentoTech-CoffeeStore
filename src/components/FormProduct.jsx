import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { useParams, useNavigate  } from "react-router-dom";
import FormField from "./FormField";
import Loading from "./Loading";
import Btn from "./Btn";
import { toast } from "react-toastify"; 

export default function FormProduct() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

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
  if (!formData) return <Loading />

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

  const handleValidChange = (name, value, isValid) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidFields((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allValid = Object.values(validFields).every(v => v === true);

    if (!allValid) {
      toast.error("Hay campos incompletos o con error. Intentalo nuevamente.");
      return;
    }

    try {
      if (isEdit) {
        await updateProduct( id, formData);
        toast.success("Producto actualizado correctamente");
        navigate('/dashboard')
      } else {
          await createProduct( formData );
          toast.success("Producto creado correctamente");
          setFormData({
            name: "",
            price: "",
            stock: "",
            category: "",
            image: "",
            description: ""
          })
      }
    } catch {
      toast.error("Error al guardar.");
    }
  };

  if (loadingInitial) return <Loading />;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="title">{isEdit ? "Editar Producto" : "Crear Nuevo Producto"}</h2>

      <FormField
        name="name"
        id="name"
        label="Nombre: "
        required
        check={["textShort"]}
        value={formData.name}
        onValid={handleValidChange}
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
        onValid={handleValidChange}
      />

      <FormField
        name="stock"
        label="Stock: "
        fieldType="number"
        check={["numberPositive"]}
        required
        value={formData.stock}
        onValid={handleValidChange}
      />

      <FormField
        fieldType="select"
        name="category"
        id="category"
        label="Categoría: "
        required
        value={formData.category}
        onValid={handleValidChange}
        options={[
                { value: "beverage", label: "Bebida" },
                { value: "bakery", label: "Bakery" },
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
        onValid={handleValidChange}
        placeholder="https://sitio-ejemplo.com/foto.jpg"
      />

      <FormField
        fieldType="textarea"
        name="description"
        id="description"
        label="Descripción"
        check={["nameLong", "minLength"]}
        value={formData.description}
        onValid={handleValidChange}
        placeholder="Ingrese una breve descripción. Máximo de 150 caracteres."
        maxLength={150}
        minLength={10}
        required
      />
      <div className="flex botonera">
        <Btn type="submit" disabled={loading} $btn='main' $w>
          {isEdit ? "Actualizar Producto" : "Crear Producto"}
        </Btn>
        <Btn $w onClick={() => navigate("/dashboard")}>
          Cancelar
        </Btn>
      </div>
      {error && <p className="error">{error}</p>}
      <p>(*) Campos obligatorios</p>
    </form>
  );
}
