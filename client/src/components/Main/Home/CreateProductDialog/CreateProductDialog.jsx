import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';


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

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth className="create-product-dialog">
      <DialogTitle>Crear Nuevo Producto</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Nombre"
            value={product.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="price"
            label="Precio"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="description"
            label="Descripción"
            multiline
            rows={4}
            value={product.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="image"
            label="URL de la imagen"
            value={product.image}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              name="id_category"
              value={product.id_category}
              onChange={handleChange}
              required
              label="Categoría"
            >
              {categories.map(category => (
                <MenuItem key={category.id_category} value={category.id_category}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="provider-label">Proveedor</InputLabel>
            <Select
              labelId="provider-label"
              name="id_provider"
              value={product.id_provider}
              onChange={handleChange}
              required
              label="Proveedor"
            >
              {providers.map(provider => (
                <MenuItem key={provider.id_provider} value={provider.id_provider}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductDialog;