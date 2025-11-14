import React from "react";
import { useParams } from "react-router-dom";
import FormProduct from "../components/FormProduct";

export default function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  return (
    <div style={{ padding: "2rem" }}>
      <FormProduct mode={isEdit ? "edit" : "create"} id={id} />
    </div>
  );
}
