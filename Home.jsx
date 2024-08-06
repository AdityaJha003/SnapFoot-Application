import React from 'react'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div> 
      <Navbar/>
      <Slider/>
      <Categories/>
      
      <Products/>
      <Newsletter/>
      <Footer/>
      </div>
  )
}

export default Home