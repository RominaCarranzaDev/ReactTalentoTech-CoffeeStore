import React from 'react'
import ImgError from '../assets/error.png'
import '../styles/styleError.css'

function ErrorLoading() {
  return (
    <div className='containerError flex'>
        <h2>Not Found</h2>
        <img src={ImgError} alt="Imagen de error." />
    </div>
  )
}

export default ErrorLoading