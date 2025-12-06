import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ImgFace from '../assets/facebook.svg';
import ImgInsta from '../assets/instagram.svg';
import ImgTiktok from '../assets/tiktok.svg';

function Footer(){
    return (
        <FooterStyled>
            <div className="signature">
                <img src="/dolce_vita.webp" alt="Logo Cafeteria Dolce Vita" width='180px'/>
                <p>Un aroma, un sorbo, un momento... Respirá. Disfrutá. <br />¡Viví el café en Dolce Vita!</p>
            </div>
            <div>
                <h4>Seguinos en nuesttras redes</h4>
                <ul className="footer-social-media">
                    <li><Link to='https://www.facebook.com/'><img src={ImgFace} alt="Logo Facebook" width='35px'/></Link></li>
                    <li><Link to='https://www.instagram.com/'><img src={ImgInsta} alt="Logo Instagram" width='35px'/></Link></li>
                    <li><Link to='https://www.tiktok.com/'><img src={ImgTiktok} alt="Logo TikTok" width='35px'/></Link></li>
                </ul>
            </div> 
            <ul className="footer-roadmap flex column">
                <li><Link to='/#'>Inicio</Link></li>
                <li><Link to='/store'>Tienda</Link></li>
                <li><Link to='/contact-us'>Contacto</Link></li>
            </ul>
                      
            <div className="footer-copy">
               <p>&copy;2025 - Dolce Vita Caffé. Sitio ficticio para proyecto educativo.</p> 
               <p>Develop by <a href="https://github.com/RominaCarranzaDev" target='_blank'>Romina Carranza</a></p>
            </div>
        </FooterStyled>
    );
} export default Footer;

const FooterStyled = styled.footer`
    display:grid;
    background-color: var(--color-dark);
    padding: var(--padding);
    text-align: center;
    color: var(--color-white);
    gap: .8rem;

    & .signature {
    border-bottom: 1px solid var(--color-secondary);
    padding-bottom: 1rem;
    }
    & .signature p {
    font-size: small;
    }
    & .footer-social-media{
        display:flex;
        justify-content: center;
        gap:1rem;
    }
        & .footer-roadmap {
        gap: 8px;
        }
    & .footer-copy {
        border-top: 1px solid var(--color-secondary);
        padding: var(--padding);
        font-size: small;
    }

     & a {
     color: white;
     padding: 8px 20px;
     }

     @media(min-width: 700px){
     grid-template-columns: repeat(3, 1fr);
     align-items: center;

    .footer-copy {
        grid-column: 1 / -1;
        text-align: center;
    }
     & .signature {
    border-bottom: none;
    }
}
`