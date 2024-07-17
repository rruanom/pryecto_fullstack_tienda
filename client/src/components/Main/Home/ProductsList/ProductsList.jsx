import React from 'react';
import ProductCard from './ProductCard/ProductCard';
import { v4 as uuidv4 } from 'uuid';

const ProductList = ({ products, onProductClick }) => {
  return (
    <section className="productList">
      {products.map((item) => (
        <ProductCard
          key={uuidv4()}
          product={item}
          onProductClick={onProductClick}
        />
      ))}
    </section>
  );
};

export default ProductList;