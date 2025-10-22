import React from "react";
import { Link } from "react-router-dom";
import IconCoffee from "../assets/logo-dvcafe.png"
import Navbar from "./Navbar";

function Header(){
    return (
        <header className="header flex"> 
            <div className="flex">
                <Link to='/'>
                    <img src={IconCoffee} alt="icono" className="icon"/>
                </Link>
                <h2>Dolce Vita Caffè</h2>
            </div> 
            <Navbar />
        </header>
    );
}
export default Header;