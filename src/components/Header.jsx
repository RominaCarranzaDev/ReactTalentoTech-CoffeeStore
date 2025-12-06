import React from "react";
import { Link } from "react-router-dom";
import IconCoffee from "/dolce_vita.webp"
import Navbar from "./Navbar";
import styled from "styled-components";

function Header(){
    return (
        <HeaderStyled> 
            <Link to='/' className="toHome flex">
                <img src={IconCoffee} alt="icono" width='150px'/>
            </Link>
            <Navbar />
        </HeaderStyled>
    );
} export default Header;

const HeaderStyled = styled.header`
    background: var(--color-primary);
    color: var(--color-white);
    min-height: var(--height-header);
    padding: var(--padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap; 

    & .menu-destok {
    display: none;
    }
    
    @media (min-width: 700px) {
    & .menu-destok {
        display: flex;
        width: 100%;
        }
    }
`