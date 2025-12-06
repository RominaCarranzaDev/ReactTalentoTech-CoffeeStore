import React, {useState, useEffect} from 'react'
import FormField from "./FormField";
import styled from 'styled-components';

function FilterBar({ onFilters }) {
    const handleCategory = (name, value) => {
        onFilters(value);
    };

    return (
      <FilterInput>
          <FormField
              fieldType="radio"
              options={[
              { value: "todos", label: "Todos", name: "category", id: "category_all" },
              { value: "hot drink", label: "Bebida Caliente", name: "category", id: "category_hot" },
              { value: "cold drink", label: "Bebida Fría", name: "category", id: "category_cold" },
              { value: "sweet bakery", label: "Dulce", name: "category", id: "category_sweet" },
              { value: "savory bakery", label: "Salado", name: "category", id: "category_savory" },
              { value: "dessert", label: "Postre", name: "category", id: "category_dessert" }
              ]}
              onValid={handleCategory}
              aria-label="Buscar por categoria"
          />
      </FilterInput>
    );
}
export default FilterBar;

const FilterInput = styled.div`
  background: var(--color-secondary);
  border: 1px solid var(--color-light);
  border-radius: var(--border-radius);
  padding: .2rem;
  width: 100%;

  & .radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: .4rem;
  }

  & input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  & label {
    background: var(--color-white);
    padding: .4rem 1.5rem;
    border-radius: calc(var(--border-radius) - .2rem);
    border: 1px solid var(--color-light);
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap; /* Evita saltos raros */
    transition: 0.3s ease;
  }

  & label:has(input:checked) {
    background: var(--color-main);
    color: var(--color-white);
    border-color: var(--color-main);
    font-weight: 700;
  }
`;