import React, { useEffect, useState, useContext }from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Btn from '../components/Btn';
import Error from '../components/Error';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [compraConfirmada, setCompraConfirmada] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleString());

    const {user} = useAuthContext();
    
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
        toast.success("¡Compra realizada con éxito!");
        setCompraConfirmada(true);
    };

    return (        
        <main className='flex'>
            { carrito.length > 0 ? (
            <Ticket>
                <div className="ticket-header">
                    <img src="src\assets\Logo.png" alt="Logo" width='120px'/>
                    <h1 className='font-title'>Dolce Vita Caffé</h1>
                    <div className="divider"></div>
                    <p className='ticket-date'>{date}</p>
                    <p>Cliente: {user.name}</p>
                    <p className="ticket-message">¡Gracias por tu compra!</p>
                </div>
                <div className="divider"></div>
                <div className="ticket-items">
                    {carrito.map((item) => (
                    <div key={item.id} className="ticket-item">
                        <p><strong>{item.name}</strong> x {item.quantity}</p>
                        <p>$ {item.price}<span>$ {(item.price * item.quantity).toFixed(2)}</span></p>
                    </div>
                    ))}
                </div>
                <div className="divider"></div>
                <div className="ticket-footer">
                    <p className="ticket-total">Total
                        <span>${totalCompra}</span>
                    </p>
                    <p className='ticket-message'>¡Esperamos volver a verte pronto!</p>                    
                </div>
                <div>
                    <Btn $btn={'main'} onClick={finalizar}>Seguir comprando</Btn>
                </div>
            </Ticket>
        ): (
            <Error mensaje='No hay datos de compra registrados.'/>
            )}
        </main>
    )
} export default Payment;

const Ticket = styled.div`
    border: 2px solid var(--color-light);
    border-radius: var(--border-radius);
    padding: 1rem 2rem;
    margin: 5vh auto;
    width: clamp(280px, 90%, 420px);
    box-shadow: 0 6px 16px var(--color-shadow);

    & .divider {
        height: 2px;
        background: repeating-linear-gradient(
        to right,
        var(--color-secondary) 0,
        var(--color-secondary) 3px,
        white 3px,
        white 6px);
        margin: 1rem auto;
    }
    
    & .ticket-header img {
        display: block;
        margin: 0 auto;
    }

    & .ticket-header .ticket-date {
        text-align: end;
        font-size: smaller;
        color: var(--color-ghost);
    }
    
    & .ticket-message {
        text-align: center;
        color: var(--color-ghost);
        margin: 1.5rem auto;
    }

    & .ticket-item p:last-child  {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    }

    & .ticket-total {
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        font-weight: 700;
        }

`