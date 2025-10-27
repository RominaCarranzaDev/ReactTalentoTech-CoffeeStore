import React from "react";
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import Cart from './pages/Cart'
import DetailProduct from './pages/DetailProduct'
import Ecommerce from './pages/Ecommerce'
import Login from './pages/Login'
import Payment from './pages/Payment'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './pages/ProtectedRouute'

function App() {

  return (
    <>
      <AuthProvider >
        <CartProvider >
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
            <Route path="/dashboard" element={
                <ProtectedRoute Admin={true}>
                  <Dashboard />
                </ProtectedRoute>}/>
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </>
  )
}
export default App
