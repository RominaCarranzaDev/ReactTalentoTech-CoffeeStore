import React, { useEffect, useState } from 'react'
import CupCoffee from '../assets/CupCoffee.png'
function ImgCupAnimate() {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handlerScroll = () => setScroll(window.scrollY);

        window.addEventListener("scroll", handlerScroll);
        return () => window.removeEventListener("scroll", handlerScroll);
    }, []);

    const rotation = Math.max(-25, -scrollY / 50); 
    const translate = scrollY * 0.2;

    return (
        <img
        src={CupCoffee}
        alt="imagen taza de café animada"
        style={{
            transform: `translateY(${translate}px) rotate(${rotation}deg)`,
            transition: "transform 0.2s ease-out",
        }}
        />
    );
}

export default ImgCupAnimate
