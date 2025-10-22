import React from 'react'
import ImgCupAnimate from './ImgCupAnimate'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='hero'>
      <h1 className='text-outline'>Dolce Vita Caffé</h1>
      <p>Un aroma, un sorbo, una pausa...</p>
      <ImgCupAnimate />
      <Link to='/store' className='btn btn-hero'>Regalate un instante</Link>
    </section>
  )
}
export default Hero