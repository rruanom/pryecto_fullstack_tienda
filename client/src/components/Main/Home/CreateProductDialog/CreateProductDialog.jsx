import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProductDialog = ({ isOpen, onClose, onSave }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    id_category: '',
    id_provider: ''
  });
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchProviders();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error al cargar las categorías');
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await axios.get('/api/providers');
      setProviders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching providers:', error);
      setError('Error al cargar los proveedores');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSave = {
      name: product.name.trim(),
      price: parseFloat(product.price),
      description: product.description.trim(),
      image: product.image.trim(),
      id_category: parseInt(product.id_category),
      id_provider: parseInt(product.id_provider)
    };
    onSave(productToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Crear Nuevo Producto</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="URL de la imagen"
            required
          />
          <select
            name="id_category"
            value={product.id_category}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(category => (
              <option key={category.id_category} value={category.id_category}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="id_provider"
            value={product.id_provider}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un proveedor</option>
            {providers.map(provider => (
              <option key={provider.id_provider} value={provider.id_provider}>
                {provider.name}
              </option>
            ))}
          </select>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductDialog;