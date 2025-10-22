import React, { useEffect, useState} from 'react'

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchProducts = async () => {
            
            try {
                const response = await fetch("https://68dd8a51d7b591b4b78cbd36.mockapi.io/coffeeStore/products", { signal });

                if (!response.ok) throw new Error("Error al obtener los productos");

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                if (error.name !== "AbortError"){
                    console.log("Error. Solicitud abortada.");
                    setError(error.message);
                } 
            } finally {
                setLoading(false);
            }
    };

    fetchProducts();

       return () => {
            console.log(`Cleanup ejecutado.)`);
            controller.abort();}
        }, []);

     return { products, loading, error };
}

export default Products;