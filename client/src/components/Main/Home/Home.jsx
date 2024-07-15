import {useState} from "react";
import ProductSearch from "./ProductSearch/ProductSearch";
import ProductsList from './ProductsList/ProductsList'

const Home = () => {

  const [products, setProducts] = useState([])

  return <div id="home">
    <section className="ProductSearchContainer"><ProductSearch setProducts={setProducts}/></section>
    <section className="ProductListContainer"><ProductsList products={products}/></section>
  </div>;
};

export default Home;
