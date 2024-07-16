import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

const ProductSearch = ({ setProducts }) => {
  const refTime = useRef(null);
  const [data, setData] = useState({
    category: '',
    provider: '',
    keyword: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Reiniciar el temporizador solo para el campo 'keyword'
    if (name === 'keyword') {
      clearTimeout(refTime.current);
      refTime.current = setTimeout(() => {
        fetchData();
      }, 500);
    } else {
      fetchData(); // Llamar a fetchData inmediatamente para category y provider
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { keyword, provider, category } = data;
      let res;
      if (keyword === "" && category === "" && provider === "") {
        res = await axios.get(`http://localhost:5000/`);
      } else {
        res = await axios.get(`http://localhost:5000/products/`, {
          params: {
            keyword: keyword,
            category: category,
            provider: provider
          }
        });
      }
      console.log("API response:", res.data);
      setProducts(res.data);
      setMessage('');
    } catch (e) {
      console.error("Error fetching products:", e);
      setMessage("No hay ningún producto que coincida con tu búsqueda");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Llamar a fetchData inmediatamente al cargar el componente
  }, [data, setProducts]);

  return (
    <article id='ProductSearch'>
      <form className="form">
        <div className="form-group search">
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            name="keyword"
            value={data.keyword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group category">
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Agua y refrescos">Agua y refrescos</option>
            {/* Opciones de categoría restantes */}
          </select>
        </div>
        <div className="form-group provider">
          <label htmlFor="provider">Provider:</label>
          <select
            name="provider"
            value={data.provider}
            onChange={handleChange}
          >
            <option value="">Selecciona un proveedor</option>
            <option value="Agua Pura S.A.">Agua Pura S.A.</option>
            {/* Opciones de proveedor restantes */}
          </select>
        </div>
      </form>
      {isLoading ? <p>Cargando...</p> : <p>{message}</p>}
    </article>
  );
};

export default ProductSearch;
