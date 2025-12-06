import React from "react";
import { useParams } from "react-router-dom";
import FormProduct from "../components/FormProduct";
import styled from "styled-components";

export default function ProductFormPage() {
  const { id } = useParams();

  return (
    <FormProductContainer>
      <FormProduct id={id} />
    </FormProductContainer>
  );
}

const FormProductContainer = styled.section`
  max-width: 600px;
  margin: 0 auto;
`