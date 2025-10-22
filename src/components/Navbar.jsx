import React, {useState} from "react";
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from "../context/AppContext";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, user, cerrarSesion, carrito, totalProductos } = useAppContext();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
        <button className="btn-nav-menu"
            onClick={() => setOpen(!open)}>
            <i className={`bx ${open ? "bx-x" : "bx-dots-vertical-rounded"}`}></i>
        </button>
        {open && (
            <nav className="nav menu-mobile flex animate-fade-in">
                <ul className="flex">
                    <li><Link to='/' onClick={() => setOpen(false)}><i className='bx bx-home'></i>Inicio</Link></li>
                    <li><Link to='/store' onClick={() => setOpen(false)}><i className='bx bx-store'></i>Tienda</Link></li>
                    <li><Link to='/contact-us' onClick={() => setOpen(false)}><i className='bx bx-phone'></i>Contacto</Link></li>
                    <li><Link to='/cart' onClick={() => setOpen(false)}><i className='bx bx-shopping-bag'></i>Carrito</Link></li>
                    <li>{isAuthenticated ? ( 
                       <><span>Hola, {user.email}</span>
                        <button onClick={cerrarSesion}><i className='bx bx-arrow-out-left-square-half'  ></i> </button> </>
                    ):(
                    <Link to='/login' onClick={() => setOpen(false)}><i className='bx bx-user'></i>Acceder </Link>) }</li>
                </ul>
            </nav>
        )}
        <nav className="nav menu-destok">
            <ul className="flex">
                <li><Link to='/' className={currentPath === "/" ? "active-link" : ""}><i className='bx bx-home'></i>Inicio</Link></li>
                <li><Link to='/store' className={currentPath === "/store" ? "active-link" : ""}><i className='bx bx-store'></i>Tienda</Link></li>
                <li><Link to='/contact-us' className={currentPath === "/contact-us" ? "active-link" : ""}><i className='bx bx-phone'></i>Contacto</Link></li>
                <li><Link to='/cart' className={currentPath === "/cart" ? "active-link notsub" : "notsub"} style={{position:'relative'}}>
                    <i className='bx bx-shopping-bag'>{carrito.length > 0 && (<span className='count-cart-nav'>{totalProductos}</span>)}</i></Link></li>
                <li>
                    {isAuthenticated ? ( 
                       <><p>Hola, {user.email}</p>
                        <button onClick={cerrarSesion}><i className='bx bx-arrow-out-left-square-half'></i>Salir</button> 
                        </>
                    ):(
                    <Link to='/login' className="btn btn-login notsub"><i className='bx bx-user'></i>log in</Link>) }
                </li>
            </ul>
        </nav>
        </>
    );
}
export default Navbar;