import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../../../../redux/cart/cartActions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductCard = ({ product, onProductClick }) => {
  const { id_product, name, price, id_category, category, image, provider } = product;
  const dispatch = useDispatch();

  const typeClass = `type-${id_category}`;
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    e.target.blur();
  };

  return (
    <Card 
      className={`product-card ${typeClass}`}
      onClick={() => onProductClick(product)}
    >
      <CardMedia
        component="img"
        image={image}
        alt={`Image of ${category}`}
        className="product-image"
      />
      <CardContent className="product-content">
        <Typography variant="h6" component="div" className="product-name">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="product-provider">
          Proveedor: {provider}
        </Typography>
        <Typography variant="h6" className="product-price">
          <strong>{price}€</strong>
        </Typography>
      </CardContent>
      <Box className="product-actions">
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          Añadir al carrito
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;