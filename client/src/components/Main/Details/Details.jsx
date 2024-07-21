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
import CloseIcon from '@mui/icons-material/Close';
import ProductEdit from '../Home/ProductsList/ProductCard/ProductEdit/ProductEdit';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Details = ({ product, onClose, onProductUpdated, onProductDeleted }) => {
  const [provider, setProvider] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        style: { borderRadius: isMobile ? 0 : 16, margin: isMobile ? 0 : 32, height: isMobile ? '100%' : 'auto' }
      }}
    >
      <Card className="details" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          action={
            <IconButton aria-label="cerrar" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              sx={{ 
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: '0.00938em'
              }}
            >
              {product.name}
            </Typography>
          }
          subheader={
            <Typography 
              variant="subtitle1"
              sx={{ 
                fontSize: '1rem',
                lineHeight: 1.5,
                letterSpacing: '0.00938em'
              }}
            >
              {`${product.provider}`}
            </Typography>
          }
          sx={{ pb: 1 }}
        />
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ 
            width: '100%', 
            height: isMobile ? '200px' : '300px', 
            objectFit: 'contain',
            backgroundColor: '#f5f5f5'
          }}
        />
        <CardContent sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Typography variant="body2" paragraph>
            {product.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" color="text.primary" gutterBottom>
            Precio: {product.price}€
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Categoría: {product.category}
          </Typography>
          {provider && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Información del Proveedor</Typography>
              <Typography variant="body2">Nombre: {provider.name}</Typography>
              <Typography variant="body2">Dirección: {provider.address}</Typography>
              <Typography variant="body2">CIF: {provider.cif}</Typography>
            </>
          )}
        </CardContent>
        <CardActions sx={{ flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', p: 2, gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            fullWidth={isMobile}
            sx={{ 
              bgcolor: '#4caf50', 
              '&:hover': { bgcolor: '#45a049' },
              color: 'white',
            }}
          >
            Añadir al Carrito
          </Button>
          {isLoggedIn && user?.isAdmin && (
            <Box sx={{ display: 'flex', gap: 1, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row' }}>
              <Button 
                variant="outlined" 
                onClick={handleEdit}
                fullWidth={isMobile}
                sx={{ 
                  color: '#4caf50', 
                  borderColor: '#4caf50', 
                  '&:hover': { borderColor: '#45a049', bgcolor: 'rgba(76, 175, 80, 0.04)' }
                }}
              >
                Editar
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleDelete}
                fullWidth={isMobile}
                sx={{ 
                  color: '#f44336', 
                  borderColor: '#f44336', 
                  '&:hover': { borderColor: '#d32f2f', bgcolor: 'rgba(244, 67, 54, 0.04)' }
                }}
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