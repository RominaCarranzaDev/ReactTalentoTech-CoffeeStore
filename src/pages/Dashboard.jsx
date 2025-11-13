import React from 'react'
import FormProduct from '../components/FormProduct'
import ProductoList from '../components/ProductList'

function Dashboard() {
  return (
    <section>
      <h2>Dashboard</h2>
      <FormProduct />
      <ProductoList view={'list'}/>
    </section>
  )
}

export default Dashboard