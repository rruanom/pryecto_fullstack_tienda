import React from 'react';
import ProductCard from './ProductCard/ProductCard';

const ProductsList = ({ products, onProductClick }) => {
  return (
    <section className="productList">
      {products.map((product) => (
        <ProductCard
          key={product.id_product}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </section>
  );
};

export default ProductsList;