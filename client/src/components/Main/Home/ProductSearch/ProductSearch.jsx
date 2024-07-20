import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import Pagination from '../../Pagination/Pagination';

const ProductSearch = ({ setProducts }) => {
  const refTime = useRef(null);
  const [objectParams, setObjectParams] = useState({
    category: '',
    provider: '',
    keyword: '',
    page: 1,
    priceOrder: '',
    limit: 10
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

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
    } else if (name === 'limit') {
      const newLimit = value === '0' ? Number.MAX_SAFE_INTEGER : parseInt(value);
      setObjectParams((prevParams) => ({
        ...prevParams,
        [name]: newLimit,
        page: 1
      }));
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
      setProducts(res.data.products);
      setTotalProducts(res.data.totalCount);
      setMessage('');
    } catch (e) {
      console.error("Error fetching products:", e);
      setMessage("No hay ningún producto que coincida con tu búsqueda");
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setObjectParams(prev => ({ ...prev, page: newPage }));
  };

  const totalPages = Math.ceil(totalProducts / objectParams.limit);

  return (
    <article className='product-search'>
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
        <div className="form-group limit">
          <label htmlFor="limit">Productos por página:</label>
          <select 
            name="limit" 
            value={objectParams.limit === Number.MAX_SAFE_INTEGER ? '0' : objectParams.limit} 
            onChange={handleChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="0">Todos</option>
          </select>
        </div>
      </form>
      {loading ? <p>Cargando...</p> : <p>{message}</p>}
      <Pagination 
        currentPage={objectParams.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        limit={objectParams.limit}
        totalProducts={totalProducts}
      />
    </article>
  );
};

export default ProductSearch;