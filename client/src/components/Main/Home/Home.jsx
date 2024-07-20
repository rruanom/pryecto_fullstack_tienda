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

  const handleProductUpdated = (updatedProduct) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id_product === updatedProduct.id_product ? updatedProduct : p)
    );
    setSelectedProduct(updatedProduct);
  };

  const handleProductDeleted = (deletedProductId) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id_product !== deletedProductId));
    setSelectedProduct(null);
  };

  return (
    <div id="home">
      <ProductSearch setProducts={setProducts} />
      <ProductsList 
        products={products} 
        onProductClick={handleProductClick} 
        setProducts={setProducts}
      />
      {selectedProduct && (
        <dialog open>
          <Details 
            product={selectedProduct} 
            onClose={handleCloseDialog}
            onProductUpdated={handleProductUpdated}
            onProductDeleted={handleProductDeleted}
          />
          <button onClick={handleCloseDialog}>Cerrar</button>
        </dialog>
      )}
    </div>
  );
};

export default Home;