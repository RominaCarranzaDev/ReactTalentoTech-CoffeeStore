import React, { useEffect, useState, useContext }from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/stylePayment.css'
import { useAuthContext } from '../context/AuthContext';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [compraConfirmada, setCompraConfirmada] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleString());

    const {user, cerrarSesion} = useAuthContext();
    
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
                    <hr />
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
    )
} export default Payment