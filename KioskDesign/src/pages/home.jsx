import React from 'react';
import ProductCard from '../components/Product/productCard';

function Home(){
  return (
    <div className='container'>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <div className="product-cards">
        <ProductCard product={{ name: 'Product 1', price: 19.99, image: '/images/product1.jpg' }} />
        <ProductCard product={{ name: 'Product 2', price: 29.99, image: '/images/product2.jpg' }} />
        <ProductCard product={{ name: 'Product 3', price: 39.99, image: '/images/product3.jpg' }} />
      </div>
    </div>
  )
}

export default Home;