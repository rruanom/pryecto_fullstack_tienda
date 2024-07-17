import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Details = ({ details }) => {
  const [product, setProduct] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id_product, id_provider } = details;

  useEffect(() => {
    const fetchProductAndProvider = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productRes = await axios.get(`http://localhost:5000/api/products/id/${id_product}`);
        const productData = productRes.data;
        setProduct(productData);

        const providerRes = await axios.get(`http://localhost:5000/api/providers/${id_provider}`);
        setProvider(providerRes.data);
      } catch (error) {
        console.error("Error fetching product or provider data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndProvider();
  }, [id_product, id_provider]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product data available.</p>;

  return (
    <div className="details">
      <h1>{product.name}</h1>
      <p>Price: {product.price}€</p>
      <p>Category: {product.category}</p>
      <img src={product.image} alt={product.name} loading="lazy" />
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