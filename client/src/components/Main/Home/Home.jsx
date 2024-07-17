import React, { useState } from "react";
import ProductSearch from "./ProductSearch/ProductSearch";
import ProductsList from './ProductsList/ProductsList'
import Details from '../Details/Details'
import CartIcon from '../CartIcon/CartIcon' // Nuevo componente que crearemos

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
      <CartIcon /> {/* Añadimos el CartIcon aquí */}
      <section className="ProductSearchContainer">
        <ProductSearch setProducts={setProducts} />
      </section>
      <section className="ProductListContainer">
        <ProductsList products={products} onProductClick={handleProductClick} />
      </section>

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