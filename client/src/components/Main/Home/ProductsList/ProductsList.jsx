import react, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; 
import ProductCard from './ProductCard/ProductCard'

const ProductList = ( {products} ) => {
  console.log(products)

  const [renderItems, setRenderItems]= useState()

  useEffect(() => {
    if (products.length !== 0) {
     setRenderItems(products.map((item) => (
        <ProductCard
          key={uuidv4()}
          product={ item }
        />
      )))
    }
}, [products]);

return <section className="productList">
 { renderItems }
</section>
};

export default ProductList;
