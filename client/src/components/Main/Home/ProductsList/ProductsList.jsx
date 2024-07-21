import React, { useState } from 'react';
import ProductCard from './ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import CreateProductDialog from '../CreateProductDialog/CreateProductDialog';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductsList = ({ products, onProductClick, setProducts }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedIn, user } = useSelector(state => state.auth);

  const handleCreateProduct = async (newProduct) => {
    try {
      console.log('Attempting to create product:', newProduct);
      const response = await axios.post('/api/products/product', newProduct);
      console.log('API response:', response.data);
      
      if (response.data && response.data.id_product) {
        setProducts(prevProducts => [...prevProducts, response.data]);
        setIsDialogOpen(false);
      } else {
        console.error('Invalid product data received:', response.data);
        alert('Error al crear el producto: Datos inválidos recibidos del servidor');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        alert(`Error al crear el producto: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Error al crear el producto: No se recibió respuesta del servidor');
      } else {
        console.error('Error message:', error.message);
        alert(`Error al crear el producto: ${error.message}`);
      }
    }
  };

  return (
    <Box className="product-list">
      {isLoggedIn && user?.isAdmin && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setIsDialogOpen(true)}
            className="create-product-btn"
          >
            Crear Nuevo Producto
          </Button>
        </Box>
      )}
      <Box className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id_product}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </Box>
      <CreateProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleCreateProduct}
      />
    </Box>
  );
};

export default ProductsList;