import React, { createContext, useContext, useState, useEffect}from 'react';
import { toast } from 'react-toastify';


export const CartContext = createContext();

export function CartProvider({children}){
    const [carrito, setCarrito] = useState([]);
    const [cargaCompleta, setCargaCompleta] = useState(false); 

    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito"); 
        if (carritoGuardado) { setCarrito(JSON.parse(carritoGuardado)) }
        setCargaCompleta(true);
    }, []); 

    useEffect(() => {
        if (cargaCompleta) { localStorage.setItem("carrito", JSON.stringify(carrito)) }
    }, [carrito, cargaCompleta]);

    const agregarAlCarrito = (producto) => {
        setCarrito((carrito) => {
        const productoExistente = carrito.find(p => p.id === producto.id);

        if (productoExistente) {
           if (productoExistente.quantity + 1 > producto.stock) {
                return carrito;
            }
            return carrito.map(p =>
                p.id === producto.id
                ? { ...p, quantity: p.quantity + 1}
                : p
            );
        } 

        return [...carrito, { ...producto, quantity: 1 }];
        });

        const existe = carrito.find(p => p.id === producto.id);

        if (existe) {
            if (existe.quantity + 1 > producto.stock) {
            toast.error("No hay stock disponible en este momento.");
            } else {
            toast.success("Producto agregado al pedido.");
            }
        } else {
            toast.success("Producto agregado al carrito.");
        }
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const eliminarProducto = (producto) => {  
        setCarrito((carrito) => carrito.filter((p) => p.id !== producto.id)); 
        toast.success('Producto eliminado del pedido.')
    }

    const restarAlCarrito = (idProducto) => {
      setCarrito(carrito.map(producto => {
        if (producto.id === idProducto) {
          const cantidadActual = producto.quantity || 1;
          if (cantidadActual === 1) {
            return null;
          }
          return { ...producto, quantity : cantidadActual - 1 };
        }
        return producto;
      }).filter(producto => producto !== null))
    }; 

    const totalProductos = carrito.reduce((acc, prod) => acc + prod.quantity, 0);

    const total = Number(carrito.reduce((acc, prod) => acc + (parseFloat(prod.price) * prod.quantity), 0).toFixed(2));

    const value = {
        carrito,
        setCarrito,
        agregarAlCarrito,
        vaciarCarrito,
        eliminarProducto,
        restarAlCarrito,
        totalProductos, 
        total
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if(!context){
        throw new Error('useCartContext debe usarse dentro de CartProvider');
    } 
    return context;
}

