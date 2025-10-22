import React, {useState} from 'react'
import Products from '../database/Products.jsx'
import '../styles/styleSearching.css'

function Searching() {
    const [search, setSearch] = useState('');
    const { products, loading, error } = Products();

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <div className='containerInput_box'>
                <input type="text" name="search" id="search" 
                    placeholder='Buscar producto...'
                    onChange={(e)=> setSearch(e.target.value.toLowerCase())}/>
                <div className="searchIcon"><i class='bx  bx-search'  ></i> </div>
            </div>
            <ul>
                {products.filter((p)=> p.name.toLowerCase().includes(search)).map((p)=> (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
        </>
    )
}

export default Searching