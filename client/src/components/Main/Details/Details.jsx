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
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="cerrar" onClick={onClose}>
              <Button onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                VOLVER
              </Button>
            </IconButton>
          }
          title={product.name}
          subheader={`Categoría: ${product.category}`}
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
            Proveedor: {product.provider}
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
        <CardActions disableSpacing>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
          >
            Añadir al Carrito
          </Button>
          {isLoggedIn && user?.isAdmin && (
            <>
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                Editar
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleDelete}>
                Eliminar
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default Details;