import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

const ProductSearch = ({ setProducts }) => {
  const refTime = useRef(null);
  const [objectParams, setObjectParams] = useState({
    category: '',
    provider: '',
    keyword: '',
    page: 1,
    priceOrder: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    fetchData();
    return () => clearTimeout(refTime.current);
  }, [objectParams]);

  const fetchProviders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/providers');
      setProviders(res.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const providerList = () => {
    return providers.map(provider => (
      <option key={provider.id} value={provider.name}>
        {provider.name}
      </option>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'keyword') {
      clearTimeout(refTime.current);
      refTime.current = setTimeout(() => {
        setObjectParams((prevParams) => ({
          ...prevParams,
          keyword: value,
          page: 1
        }));
      }, 1000);
    } else {
      setObjectParams((prevParams) => ({
        ...prevParams,
        [name]: value,
        page: 1
      }));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log('Fetching data with params:', objectParams);
      const res = await axios.get(`http://localhost:5000/api/products/page`, { params: objectParams });
      console.log("API response:", res.data);
      setProducts(res.data);
      setMessage('');
    } catch (e) {
      console.error("Error fetching products:", e);
      setMessage("No hay ningún producto que coincida con tu búsqueda");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article id='ProductSearch'>
      <form className="form">
        <div className="form-group search">
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            name="keyword"
            onChange={handleChange}
          />
        </div>
        <div className="form-group category">
          <label htmlFor="category">Category:</label>
          <select name="category" onChange={handleChange}>
            <option key="default-category" value="">Selecciona una categoría</option>
            {[
              "Agua y refrescos",
              "Arroz, legumbres y pasta",
              "Bodega",
              "Carne",
              "Cereales y galletas",
              "Charcutería y quesos",
              "Fruta y verdura",
              "Huevos, leche y mantequilla",
              "Pan y bollería",
              "Pasta y arroz",
            ].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="form-group provider">
          <label htmlFor="provider">Provider:</label>
          <select name="provider" onChange={handleChange} value={objectParams.provider}>
            <option key="default-provider" value="">Selecciona un proveedor</option>
            {providers.map((provider, index) => (
              <option key={`${index}-${provider.name}`} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group price-order">
          <label htmlFor="priceOrder">Orden de precio:</label>
          <select name="priceOrder" onChange={handleChange}>
            <option key="default-price" value="">Sin orden</option>
            <option key="asc-price" value="asc">Menor precio primero</option>
            <option key="desc-price" value="desc">Mayor precio primero</option>
          </select>
        </div>
      </form>
      {loading ? <p>Cargando...</p> : <p>{message}</p>}
    </article>
  );
};

export default ProductSearch;