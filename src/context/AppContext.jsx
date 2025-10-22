import React, { createContext, useContext, useState }from 'react'

export const AppContext = createContext();

export function AppProvider({children}){
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({ email: '', password: ''});

    const cerrarSesion = () => {
        setIsAuthenticated(false);
        setUser({ email: '', password: '' });
    };

    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((carrito) => {
        const productoExistente = carrito.find(p => p.id === producto.id);

        if (productoExistente) {
            return carrito.map(p =>
                p.id === producto.id
                ? { ...p, quantity: p.quantity + 1}
                : p
            );
        } else {
            return [...carrito, { ...producto, quantity: 1 }];
        }
    });
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const eliminarProducto = (producto) => {  
        setCarrito((carrito) => carrito.filter((p) => p.id !== producto.id)); 
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

    const total = carrito.reduce((acc, prod) => acc + (parseFloat(prod.price) * prod.quantity), 0).toFixed(2);

    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        cerrarSesion,

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
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if(!context){
        throw new Error('useAppContext debe usarse dentro de AppProvider');
    } 
    return context;
}

