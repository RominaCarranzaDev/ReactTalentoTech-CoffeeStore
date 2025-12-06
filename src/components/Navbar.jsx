import React, {useState} from "react";
import { Link, useLocation } from 'react-router-dom'
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { BiDotsVerticalRounded, BiCartAlt, BiLogOut, BiLogIn } from "react-icons/bi";
import Btn from "./Btn";
import styled from "styled-components";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { carrito, totalProductos, vaciarCarrito } = useCartContext();
    const { user , isAuthenticated, cerrarSesion } = useAuthContext();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = () => {
        cerrarSesion()
        vaciarCarrito()
    }

    return (
        <>
        <BtnMenu onClick={() => setOpen(!open)} aria-label="boton menú desplegable">
            { !open ? <BiDotsVerticalRounded /> : 'x'}
        </BtnMenu>
        {open && (
            <MenuMobile className="animate-fade-in">
                <Navigation>
                    <NavigationLink><Link to='/' onClick={() => setOpen(false)}>Inicio</Link></NavigationLink>
                    <NavigationLink><Link to='/store' onClick={() => setOpen(false)}>Menú</Link></NavigationLink>
                    <NavigationLink><Link to='/contact-us' onClick={() => setOpen(false)}>Contacto</Link></NavigationLink>
                    <NavigationLink><Link to='/cart' onClick={() => setOpen(false)}>Mi Pedido</Link></NavigationLink>
                    {user && user.rol == 'admin' ? 
                    <NavigationLink><Link to='/dashboard' onClick={() => setOpen(false)}>Dashboard</Link></NavigationLink> : '' }
                    <NavigationLink>
                        {isAuthenticated ? (
                            <LoggedInUser>
                                <summary>
                                    <span>Hola, {user.name}</span>
                                </summary>
                                <Btn onClick={handleLogout}>
                                    <BiLogOut /> Salir
                                </Btn>
                            </LoggedInUser>
                            ) : (
                            <Link to='/login' onClick={() => setOpen(false)}>
                                <BiLogIn /> Ingresá
                            </Link>
                        )}
                    </NavigationLink>
                </Navigation>
            </MenuMobile>
        )}
        <nav className="menu-destok">
            <Navigation>
                <NavigationLink><Link to='/' className={currentPath === "/" ? "active-link" : ""}>Inicio</Link></NavigationLink>
                <NavigationLink><Link to='/store' className={currentPath === "/store" ? "active-link" : ""}> Menú</Link></NavigationLink>
                <NavigationLink><Link to='/contact-us' className={currentPath === "/contact-us" ? "active-link" : ""}>Contacto</Link></NavigationLink>
                <NavigationLink><Link to='/cart' className={currentPath === "/cart" ? "active-link" : ""}><BiCartAlt/>{carrito.length > 0 && (<span className='count-cart-nav'>{totalProductos}</span>)} Mi Pedido</Link></NavigationLink>
                {user && user.rol == 'admin' ? <NavigationLink><Link to='/dashboard' className={currentPath === '/dashboard' ? "active-link" : ""}>Dashboard</Link></NavigationLink> : '' }
            </Navigation>
            {isAuthenticated ? (
            <LoggedInUser>
                <summary>
                    <span>Hola, {user.name}</span>
                </summary>
                <div className="dropdown">
                    <Btn onClick={handleLogout}>
                    <BiLogOut /> Salir
                    </Btn>
                </div>
            </LoggedInUser>
            ) : (
            <BtnLogin as={Link} to='/login' onClick={() => setOpen(false)} className='notsub'>
                <BiLogIn /> Ingresá
            </BtnLogin>
            )}
        </nav>
        </>
    );
} export default Navbar;

const BtnMenu = styled.button`
    background: transparent;
    color: var(--color-white);
    font-size: 2rem;

    @media (min-width: 700px) {
    display: none;
    }
`
const LoggedInUser = styled.details`
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: var(--color-dark);
    padding: var(--padding);
    transition: all .5s;

    &:hover {
    text-decoration: underline;
    text-underline-offset: 8px;
    font-weight: 700;
    }
    & summary {
    cursor: pointer;
    display: flex;
    align-items: center;
    } ::-webkit-details-marker {
    display: none;
    }
    & .dropdown {
        position: absolute;
        top: 100%;
        right:0;
        border-radius: var(--border-radius);
        display: none; 
        background: var(--color-white);
        box-shadow: 0 4px 10px rgba(0,0,0,.15);
        padding: .5rem;
        z-index: 50;

    }
    &[open] .dropdown {
    display: block;
    }

    @media(min-width: 700px){
        background: var(--color-primary);
    }

`
const MenuMobile = styled.nav`
    position: absolute;
    top: var(--height-header);
    left: 0;
    transition: all .3s ease-out;
    z-index: 100;
    box-shadow: 0 8px 8px 8px var(--color-shadow);


    @media (min-width: 700px) {
    display: none;
    }

`
const Navigation = styled.ul`
  width: 100vw;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: start;
  padding: 2rem;
  background: var(--color-dark);


  @media (min-width: 700px) {
  width: 100%;
  flex-direction: row;
  background: transparent;
  justify-content: end;
  align-items: center;
  padding: 0;
    gap:0;
  }

`
const NavigationLink = styled.li`
    & a:not(.notsub) {
    color: var(--color-white);
    position: relative;
    padding: .5rem .5rem ;
    transition: all .5s ease;
    } 
    a:not(.notsub):hover {
        color: var(--color-secondary);
        font-weight: 600;
    }

    a:not(.notsub)::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: var(--color-secondary);
    transition: all .3s ease;
    transform: translateX(-50%);
    }
    a:hover::after {
    width: 100%;
    }
    .active-link {
    color: var(--color-secondary);
    font-weight: 800;
    }

    & .count-cart-nav {
    background-color: var(--color-ghost);
    color: var(--color-white);
    font-size: .8rem;
    position: absolute;
    top: -8px;
    left: 12px;
    border-radius: 8px;
    padding: 2px 4px;
    }
`
const BtnLogin = styled.a`
    border:1px solid var(--color-main);
    display: flex;
    gap:.5rem;
    align-items: center;
    background: var(--color-shadow);
    color: var(--color-white);
    padding: 6px 12px;
    border-radius: var(--border-radius);
    transiion: all .5s;

    &:hover {
    background: var(--color-main);
    color: var(--color-dark);
    }
`