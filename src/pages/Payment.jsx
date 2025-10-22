import React, { useEffect, useState, useContext }from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/stylePayment.css'
import { useAppContext } from '../context/AppContext';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [compraConfirmada, setCompraConfirmada] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleString());

    const {vaciarCarrito, isAuthenticated, setIsAuthenticated, user, setUser, cerrarSesion} = useAppContext();
    
    const carrito = location.state?.carrito || [];
    const totalCompra = carrito.reduce((acc, prod) => acc + (parseFloat(prod.price) * prod.quantity), 0).toFixed(2);

    useEffect(() => {
        let timer;
        if (compraConfirmada) {
        timer = setTimeout(() => setCompraConfirmada(false), 5000);
        navigate("/store");
        }

        return () => clearTimeout(timer);
    }, [compraConfirmada]);

    const finalizar = () => {
        setCompraConfirmada(true);
        alert("¡Compra realizada con éxito!");
    };

    

    return (
        <div>
            <div>
                <h2>{user.email}</h2>

                <button className='btn btn-out' onClick={cerrarSesion}>Cerrar sesión</button>
                <hr />
            </div>
            <div>
                { carrito.length > 0 ? (
                <div className="ticket">
                    <h2 className="title">Dolce Vita Caffé</h2>
                    <p className="ticket-subtitle">Gracias por tu compra</p>

                    <div className="ticket-items">
                        {carrito.map((item) => (
                        <div key={item.id} className="ticket-item">
                            <span>{item.name} x {item.quantity} {item.price}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        ))}
                    </div>

                    <p className="ticket-total">
                        <span>Total</span>
                        <strong>${totalCompra}</strong>
                    </p>

                    <div className="ticket-footer">
                        <p>¡Esperamos verte pronto!</p>
                        <p>Emitido: {date}</p>
                        
                    </div>

                    <div>
                    <button className='btn' onClick={finalizar}>Volver a la tienda</button>
                </div>
                </div>
            ): (
                <p className="no-data">No hay datos de compra.</p>
                )}
            </div>
        </div>  
     )
}

export default Payment