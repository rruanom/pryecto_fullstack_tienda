import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../../redux/cart/cartActions";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ProductEdit from '../Home/ProductsList/ProductCard/ProductEdit/ProductEdit';

const Details = ({ product, onClose, onProductUpdated, onProductDeleted }) => {
  const [provider, setProvider] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const providerRes = await axios.get(`http://localhost:5000/api/providers/${product.id_provider}`);
        setProvider(providerRes.data);
      } catch (error) {
        console.error("Error al obtener datos del proveedor:", error);
      }
    };

    fetchProvider();
  }, [product.id_provider]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/product/${product.id_product}`);
      onProductDeleted(product.id_product);
      alert(`Se ha borrado el producto ${product.name}`);
      onClose();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleUpdateSuccess = (updatedProduct) => {
    onProductUpdated(updatedProduct);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Dialog open={true} onClose={() => setIsEditing(false)} maxWidth="md" fullWidth>
        <ProductEdit
          product={product}
          onUpdateSuccess={handleUpdateSuccess}
          onCancel={() => setIsEditing(false)}
        />
      </Dialog>
    );
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: { borderRadius: 16 }
      }}
    >
      <Card className="details">
        <CardHeader
          action={
            <IconButton aria-label="cerrar" onClick={onClose}>
              <Button onClick={onClose} className="details-button">
                VOLVER
              </Button>
            </IconButton>
          }
          title={<Typography variant="h2">{product.name}</Typography>}
          subheader={<Typography variant="h6">{`${product.provider}`}</Typography>}
        />
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
          style={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography variant="h6" color="text.primary">
            Precio: {product.price}€
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
          {provider && (
            <>
              <Divider style={{ margin: '16px 0' }} />
              <Typography variant="h6">Información del Proveedor</Typography>
              <Typography variant="body2">Nombre: {provider.name}</Typography>
              <Typography variant="body2">Dirección: {provider.address}</Typography>
              <Typography variant="body2">CIF: {provider.cif}</Typography>
            </>
          )}
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            className="details-button"
            sx={{ color: 'white', backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
          >
            Añadir al Carrito
          </Button>
          {isLoggedIn && user?.isAdmin && (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Button 
                variant="outlined" 
                onClick={handleEdit} 
                className="details-button"
                sx={{ color: '#4caf50', borderColor: '#4caf50', '&:hover': { borderColor: '#45a049' } }}
              >
                Editar
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleDelete} 
                className="details-button"
                sx={{ color: '#f44336', borderColor: '#f44336', '&:hover': { borderColor: '#d32f2f' } }}
              >
                Eliminar
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default Details;