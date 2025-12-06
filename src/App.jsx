import React from "react";
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext";
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
import ProductFormPage from './pages/ProductFormPage';
import { ToastContainer } from 'react-toastify' ;
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <AuthProvider >
        <CartProvider >
          <ProductProvider >
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
                </ProtectedRoute> } />
            <Route path="/dashboard/product/new"  element={
              <ProtectedRoute Admin={true}>
                <ProductFormPage mode="create" />
              </ProtectedRoute>  } />
            <Route path="/dashboard/product/edit/:id" element={
              <ProtectedRoute Admin={true}>
                <ProductFormPage mode="edit" />
              </ProtectedRoute> } />
          </Routes>
          < ToastContainer 
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            /> 
          <Footer />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
      
    </>
  )
}
export default App
