import React, {useState, useEffect} from 'react'
import { BiSearchAlt } from "react-icons/bi";
import FormField from "./FormField";
import styled from 'styled-components';

function SearchingBar({ onResults}) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        onResults(search);
    }, [search]);

    const handleInput = (value) => {
        setSearch(value);
    };

    return (
        <SearchInput>  
            <BiSearchAlt />
            <FormField 
                fieldType='search' 
                name='searchProduct'
                id='searchProduct'
                value={search}
                placeholder='Buscá tu antojo de hoy...'
                onChange={(e) => handleInput(e.target.value.toLowerCase())}
                aria-label="Buscar productos por nombre"
            />
        </SearchInput>
    );
} export default SearchingBar;

const SearchInput = styled.div`
    position: relative;

    & svg {
        position: absolute;
        left: .5rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.2rem;
    } 
    & input {
        width: clamp(260px, 680px, 60vw);
        padding-left: 1.8rem;
    }
`