import React from "react";
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from "./context/AppContext";
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import Cart from './pages/Cart'
import DetailProduct from './pages/DetailProduct'
import Ecommerce from './pages/Ecommerce'
import Login from './pages/Login'
import Payment from './pages/Payment'
import ProtectedRoute from './pages/ProtectedRouute'

function App() {

  return (
    <>
      <AppProvider >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Ecommerce />} />
          <Route path='/store/product/:id' element={<DetailProduct />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/cart' element={<Cart />}  />
          <Route path='/login' element={<Login  />} /> 
          <Route path='/payment' element={
              <ProtectedRoute>
                <Payment  />
              </ProtectedRoute> } />
        </Routes>
        <Footer />
      </AppProvider>
    </>
  )
}
export default App
