import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

const ProductSearch = ({ setProducts }) => {
  const refTime = useRef(null);
  const [objectParams, setObjectParams] = useState({
    category: '',
    provider: '',
    keyword: '',
    page: 1,
    priceOrder: '' // Nuevo parámetro
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Estado inicial false para evitar carga innecesaria
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
      const res = await axios.get('http://localhost:5000/providers');
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
      const res = await axios.get(`http://localhost:5000/products`, { params: objectParams });
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
          <select
            name="category"
            onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            <option value="Agua y refrescos">Agua y refrescos</option>
            <option value="Arroz, legumbres y pasta">Arroz, legumbres y pasta</option>
            <option value="Bodega">Bodega</option>
            <option value="Carne">Carne</option>
            <option value="Cereales y galletas">Cereales y galletas</option>
            <option value="Charcutería y quesos">Charcutería y quesos</option>
            <option value="Fruta y verdura">Fruta y verdura</option>
            <option value="Huevos, leche y mantequilla">Huevos, leche y mantequilla</option>
            <option value="Pan y bollería">Pan y bollería</option>
            <option value="Pasta y arroz">Pasta y arroz</option>
            {/* Opciones de categoría restantes */}
          </select>
        </div>
        <div className="form-group provider">
          <label htmlFor="provider">Provider:</label>
          <select name="provider" onChange={handleChange} value={objectParams.provider}>
            <option value="">Selecciona un proveedor</option>
            {providerList()}
          </select>
        </div>
        <div className="form-group price-order">
          <label htmlFor="priceOrder">Orden de precio:</label>
          <select name="priceOrder" onChange={handleChange}>
            <option value="">Sin orden</option>
            <option value="asc">Menor precio primero</option>
            <option value="desc">Mayor precio primero</option>
          </select>
        </div>
      </form>
      {loading ? <p>Cargando...</p> : <p>{message}</p>}
    </article>
  );
};

export default ProductSearch;

