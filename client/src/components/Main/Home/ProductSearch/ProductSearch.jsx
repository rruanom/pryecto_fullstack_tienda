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
  const [loading, setLoading] = useState(true);

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
  }

  useEffect(() => {
    fetchData();
    return () => clearTimeout(refTime.current);
  }, [objectParams]);


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
          <select
            name="provider"
            onChange={handleChange}
          >
            <option value="">Selecciona un proveedor</option>
            <option value="Agua Pura S.A.">Agua Pura S.A.</option>
            <option value="Refrescos del Sur S.L.">Refrescos del Sur S.L.</option>
            <option value="Jugos Naturales SL">Jugos Naturales SL</option>
            <option value="Pasta y Legumbres S.A.">Pasta y Legumbres S.A.</option>
            <option value="Aceites Finos SL">Aceites Finos SL</option>
            <option value="Vinos y Vinagres SL">Vinos y Vinagres SL</option>
            <option value="Carnes del Norte SL">Carnes del Norte SL</option>
            <option value="Charcutería Ibérica S.A.">Charcutería Ibérica S.A.</option>
            <option value="Quesos Manchegos S.L.">Quesos Manchegos S.L.</option>
            <option value="Frutas Frescas S.L.">Frutas Frescas S.L.</option>
            <option value="Verduras del Campo S.A.">Verduras del Campo S.A.</option>
            <option value="Lácteos del Valle S.L.">Lácteos del Valle S.L.</option>
            <option value="Huevo Fresco SL">Huevo Fresco SL</option>
            <option value="Mantequillas Artesanas SL">Mantequillas Artesanas SL</option>
            <option value="Pescados del Mar S.A.">Pescados del Mar S.A.</option>
            <option value="Panadería Artesanal SL">Panadería Artesanal SL</option>
            <option value="Pastelería Dulce SL">Pastelería Dulce SL</option>
            <option value="Limpieza Total S.A.">Limpieza Total S.A.</option>
            <option value="Hogar Limpio SL">Hogar Limpio SL</option>
            <option value="Mariscos del Atlántico S.A.">Mariscos del Atlántico S.A.</option>
            <option value="Agua y Refrescos Unidos S.L.">Agua y Refrescos Unidos S.L.</option>
            <option value="Legumbres del País SL">Legumbres del País SL</option>
            <option value="Aceites y Vinagres Gourmet SL">Aceites y Vinagres Gourmet SL</option>
            <option value="Carnes Premium S.A.">Carnes Premium S.A.</option>
            <option value="Quesos y Charcutería SL">Quesos y Charcutería SL</option>
            <option value="Frutas del Valle SL">Frutas del Valle SL</option>
            <option value="Verduras Frescas S.A.">Verduras Frescas S.A.</option>
            <option value="Lácteos Naturales SL">Lácteos Naturales SL</option>
            <option value="Huevos de Oro SL">Huevos de Oro SL</option>
            <option value="Mariscos y Pescados SL">Mariscos y Pescados SL</option>
            <option value="Cereales del Sol SL">Cereales del Sol SL</option>
            <option value="Panadería La Espiga">Panadería La Espiga</option>
            <option value="Pasta Fresca S.L.">Pasta Fresca S.L.</option>
            <option value="Arroces del Mundo S.A.">Arroces del Mundo S.A.</option>
          </select>
          <div className="form-group price-order">
            <label htmlFor="priceOrder">Orden de precio:</label>
            <select
              name="priceOrder"
              onChange={handleChange}
            >
              <option value="">Sin orden</option>
              <option value="asc">Menor precio primero</option>
              <option value="desc">Mayor precio primero</option>
            </select>
          </div>
        </div>
      </form>
      {loading ? <p>Cargando...</p> : <p>{message}</p>}
    </article>
  );
};

export default ProductSearch;
