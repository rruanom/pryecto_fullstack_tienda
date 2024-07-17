import React, { useState } from "react";
import ProductSearch from "./ProductSearch/ProductSearch";
import ProductsList from './ProductsList/ProductsList'
import Details from '../Details/Details'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    console.log("Selected product:", product);
    setSelectedProduct({
      id_product: product.id_product,
      id_provider: product.id_provider
    });
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  return (
    <div id="home">
      <section className="ProductSearchContainer">
        <ProductSearch setProducts={setProducts} />
      </section>
      <section className="ProductListContainer">
        <ProductsList products={products} onProductClick={handleProductClick} />
      </section>

      {selectedProduct && (
        <dialog open>
          <Details details={selectedProduct} />
          <button onClick={handleCloseDialog}>Cerrar</button>
        </dialog>
      )}
    </div>
  );
};

export default Home;