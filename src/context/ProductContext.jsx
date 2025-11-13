import React, { createContext, useContext, useState, useEffect } from "react";
import { ENDPOINT } from "../config/AppConfig";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [productoActual, setProductoActual] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const URL_PRODUCTS = ENDPOINT.productos;

    const requestAPI = async (url, method = "GET", data = null) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };
        if (data && method !== "GET") options.body = JSON.stringify(data);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error ${method}: ${response.statusText}`);
        const result = await response.json();
        setSuccess("Operación realizada con éxito");
        return result;
        } catch (err) {
        setError(err.message);
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const loadAllProducts = async () => {
        try {
            const data = await requestAPI(URL_PRODUCTS);
            setProductos(data);
        } catch (err) {
            console.error("Error al obtener productos:", err);
        }
    };

    const getProductId = async (id) => {
        try {
            const data = await requestAPI(`${URL_PRODUCTS}/${id}`);
            setProductoActual(data);
            return data;
        } catch (err) {
            console.error("Error al obtener producto:", err);
        }
    };

    const getFiltered = async (filters = {}) => {
        const query = new URLSearchParams(filters).toString();
        try {
            const data = await requestAPI(`${URL_PRODUCTS}?${query}`);
            setProductos(data);
        } catch (err) {
            console.error("Error al filtrar productos:", err);
        }
    };

    const getSearch = async (search) => {
        try {
            const data = await requestAPI(`${URL_PRODUCTS}?search=${encodeURIComponent(search)}`
            );
            setProductos(data);
        } catch (err) {
            console.error("Error en la búsqueda:", err);
        }
    };

    const createProduct = async (nuevoProducto) => {
        try {
            const data = await requestAPI(URL_PRODUCTS, "POST", nuevoProducto);
            setProductos((prev) => [...prev, data]);
            return data;
        } catch (err) {
            console.error("Error al crear producto:", err);
        throw err;
        }
    };

    const updateProduct = async (productoEditado) => {
        try {
            const data = await requestAPI(`${URL_PRODUCTS}/${productoEditado.id}`, "PUT", productoEditado);
            setProductos((prev) =>
                prev.map((p) => (p.id === productoEditado.id ? data : p))
            );
            return data;
        } catch (err) {
            console.error("Error al actualizar producto:", err);
        throw err;
        }
    };
    const deleteProduct = async (id) => {
        try {
            await requestAPI(`${URL_PRODUCTS}/${id}`, "DELETE");
            setProductos((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Error al eliminar producto:", err);
        }
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    const value = {
        productos,
        productoActual,
        loading,
        error,
        success,
        loadAllProducts,
        getProductId ,
        getFiltered,
        getSearch,
        createProduct,
        updateProduct,
        deleteProduct,
    };
    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    );
    }

    export function useProductContext() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext debe usarse dentro de ProductProvider");
    }
    return context;
}
