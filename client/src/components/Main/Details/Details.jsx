import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../../redux/cart/cartActions"; // Asegúrate de que la ruta sea correcta

const Details = ({ product }) => {
  const [provider, setProvider] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const providerRes = await axios.get(`http://localhost:5000/api/providers/${product.id_provider}`);
        setProvider(providerRes.data);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    fetchProvider();
  }, [product.id_provider]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="details">
      <h1>{product.name}</h1>
      <p>Price: {product.price}€</p>
      <p>Category: {product.category}</p>
      <img src={product.image} alt={product.name} />
      <button onClick={handleAddToCart}>Añadir al carrito</button>
      {provider && (
        <>
          <h2>Provider Information</h2>
          <p>Name: {provider.name}</p>
          <p>Address: {provider.address}</p>
          <p>CIF: {provider.cif}</p>
        </>
      )}
    </div>
  );
};

export default Details;