import React from 'react';
import "../css/ProductCardStyles.css";
import ProductCard from './ProductCard';

const ProductSection = () => {
  return (
    <div className='productsection'>
      <h1>Our Products</h1>
      <div className='products_section_productsection'>
        <ProductCard />
        {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
    </div>
  )
}

export default ProductSection;
