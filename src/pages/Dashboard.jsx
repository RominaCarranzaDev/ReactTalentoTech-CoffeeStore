import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SearchingBar from "../components/SearchingBar";
import FilterBar from "../components/FilterBar";
import ProductoList from "../components/ProductList";
import Btn from "../components/Btn";
import { toast } from "react-toastify";
import styled from "styled-components";

function Dashboard() {
  const navigate = useNavigate();
  const { productos, cargando, error, deleteProduct } = useProductContext();
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todos");  

  const productosFiltrados = productos.filter(p =>
      categoria === "todos" ? true : p.category.toLowerCase() === categoria
      ).filter(p =>
      search.trim() === "" ? true : p.name.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => navigate("/dashboard/product/new");

  const handleEdit = (id) => navigate(`/dashboard/product/edit/${id}`);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
      try {
        await deleteProduct(id);
        toast.success("Producto eliminado con éxito");
      } catch (err) {
        console.error("Error eliminando:", err);
        toast.error("Error al eliminar el producto.");
      }
  };

  return (
    <DashboardContainer>
      <h1 className="title">Panel de Administración</h1>
      <h2>Gestión de Productos</h2>
      <p>Agregar, editar y eliminar productos del menú.</p>
      <DashboardActions>
        <Btn onClick={handleCreate} $btn='main' $w >
           Crear nuevo Producto
        </Btn>
        <SearchingBar onResults={setSearch}/>
        <FilterBar onFilters={setCategoria} />
      </DashboardActions>

      {cargando && <Loading />}

      {!cargando && !error && (
        <section>
          <ProductoList
            view="table"
            selectedProducts={productosFiltrados}
            itemsPerPage={10}
            onEdit={handleEdit}
            onDelete={handleDelete}/>
        </section>
      )}

      {!cargando && productosFiltrados.length === 0 && (
        <Error mensaje='Products Not Found' />
      )}
      {error && <Error mensaje={error} />}
    </DashboardContainer>
  );
} export default Dashboard;

const DashboardContainer = styled.main`
  padding: 8vh 5vw;
`

const DashboardActions = styled.div`
  display: grid;
  gap: 1rem;
  margin: 5vh auto;

  @media (min-width: 700px) {
  grid-template-columns: 1fr 3fr;
  align-items: baseline;

  :last-child {
  grid-column: 1 /-1;}
  }

  &  button {
  grid-column: 1 span 2;
  }
  
`