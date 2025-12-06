import React, {useState} from "react";
import { useProductContext } from "../context/ProductContext";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import Btn from './Btn';
import styled from "styled-components";

function CardDashboard({product, onDelete, onEdit}) {
    const { loading } = useProductContext();
    const [ seeDescription, setSeeDescription ] = useState(false);

    return (
        <Card key={product.id}>
            <div>
                <img src={product.image} alt={product.name}/>
            </div>
            <div className="card-body">
                <h3>{product.name}</h3>
                <p><strong>Precio: </strong>$ {product.price}</p>
                <p><strong>Stock: </strong>{product.stock}</p>
                <p><strong>Categoría: </strong>{product.category}</p>
            
                <div className={ seeDescription ? 'description' : 'description line-clamp'} title={product.description} onClick={()=> {setSeeDescription(!seeDescription)}}>
                    <p><strong>Descripción: </strong></p>{product.description}
                </div>
            </div>
            <div className="botonera flex column">
                <Btn $btn='out' onClick={() => onEdit(product.id)} ><BiEditAlt />Editar</Btn>
                <Btn $btn='danger' disabled={loading} onClick={() => onDelete(product.id)}><BiTrash /> {loading ? 'Eliminando...' :'Eliminar'}</Btn>
            </div>
        </Card>             
    );
} export default CardDashboard;

const Card = styled.div`
    width: clamp( 220px, 80vw, 1200px);
    border-bottom: 2px solid var(--color-primary);
    margin: 0 auto;
    display: grid;

    & img {
        width: 70%;
        display: block;
        margin : 0 auto;
        border-radius: var(--border-radius);
        outline: 2px solid var(--color-primary);
        margin-bottom: 2rem;
    }
    & .card-body {
        display: flex;
        flex-direction: column;
        gap: .4rem;
        margin-bottom: 2rem;
        padding: var(--padding);
    }
    & .description, .botonera {
        margin-bottom: 2rem;
    }

    @media (min-width: 700px) {
        grid-template-columns: 1fr 3fr 1fr;
        background-color: var(--color-white);
        align-items: center;
    }
`