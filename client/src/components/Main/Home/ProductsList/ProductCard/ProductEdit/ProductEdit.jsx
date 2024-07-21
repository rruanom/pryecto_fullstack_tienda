import React, { useState, useEffect } from "react";
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

const ProductEdit = ({ product, onUpdateSuccess, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchCategoriesAndProviders();
  }, []);

  const fetchCategoriesAndProviders = async () => {
    try {
      const [categoriesRes, providersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/providers')
      ]);
      setCategories(categoriesRes.data);
      setProviders(providersRes.data);
    } catch (error) {
      console.error("Error fetching categories and providers:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/products/product/${product.id_product}`, {
        name: editedProduct.name,
        description: editedProduct.description,
        price: editedProduct.price,
        image: editedProduct.image,
        category: editedProduct.category,
        provider: editedProduct.provider
      });
      onUpdateSuccess(response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth className="product-edit-dialog">
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Nombre"
            value={editedProduct.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="price"
            label="Precio"
            type="number"
            value={editedProduct.price}
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
            value={editedProduct.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="image"
            label="URL de la imagen"
            value={editedProduct.image}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={editedProduct.category}
              onChange={handleChange}
              required
              label="Categoría"
            >
              {categories.map(category => (
                <MenuItem key={category.id_category} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="provider-label">Proveedor</InputLabel>
            <Select
              labelId="provider-label"
              name="provider"
              value={editedProduct.provider}
              onChange={handleChange}
              required
              label="Proveedor"
            >
              {providers.map(provider => (
                <MenuItem key={provider.id_provider} value={provider.name}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onCancel}
          sx={{ 
            color: '#4caf50', 
            borderColor: '#4caf50', 
            '&:hover': { 
              backgroundColor: 'rgba(76, 175, 80, 0.04)', 
              borderColor: '#45a049' 
            } 
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{ 
            backgroundColor: '#4caf50', 
            color: 'white',
            '&:hover': { 
              backgroundColor: '#45a049' 
            } 
          }}
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEdit;