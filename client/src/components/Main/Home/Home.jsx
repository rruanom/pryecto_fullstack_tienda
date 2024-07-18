import React, { useState } from "react";
import ProductSearch from "./ProductSearch/ProductSearch";
import ProductsList from './ProductsList/ProductsList';
import Details from '../Details/Details';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  return (
    <div id="home">
      <ProductSearch setProducts={setProducts} />
      <ProductsList 
        products={products} 
        onProductClick={handleProductClick} 
        setProducts={setProducts}  // Añade esta línea
      />
      {selectedProduct && (
        <dialog open>
          <Details product={selectedProduct} />
          <button onClick={handleCloseDialog}>Cerrar</button>
        </dialog>
      )}
    </div>
  );
};


export default Home;