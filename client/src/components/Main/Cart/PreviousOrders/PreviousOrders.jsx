import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, addToCart } from "../../../../redux/cart/cartActions";
import axios from 'axios';
import { useAlertContext } from '../../../Common/AlertContext/AlertContext';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Box,
  Button
} from '@mui/material';

const PreviousOrders = () => {
  const [previousCarts, setPreviousCarts] = useState([]);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { showConfirmDialog, showSnackbar } = useAlertContext();

  useEffect(() => {
    const fetchPreviousCarts = async () => {
      try {
        const response = await axios.get(`/api/oldcarts/${user.email}`);
        setPreviousCarts(response.data);
      } catch (error) {
        console.error("Error fetching previous carts", error);
        showSnackbar("Error al cargar los pedidos anteriores", "error");
      }
    };

    if (user) {
      fetchPreviousCarts();
    }
  }, [user, showSnackbar]);

  const handleLoadCart = (cart) => {
    showConfirmDialog(
      "Cargar pedido anterior",
      "¿Estás seguro de que quieres cambiar el carrito actual por este pedido anterior?",
      () => {
        dispatch(clearCart());
        cart.products.forEach(product => {
          dispatch(addToCart(product));
        });
        showSnackbar("Carrito cargado correctamente", "success");
      }
    );
  };

  const calculateTotal = (products) => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
  };

  return (
    <Box className='previousOrders' sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pedidos Anteriores
      </Typography>
      <List>
        {previousCarts.map((cart, index) => (
          <Accordion key={index}>
            <AccordionSummary
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography>
                ▼ Pedido del {new Date(cart.date).toLocaleDateString()} - 
                Total: {calculateTotal(cart.products)}€
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="body1">
                  Número de productos: {cart.products.length}
                </Typography>
                <List>
                  {cart.products.map((product, productIndex) => (
                    <ListItem key={productIndex}>
                      <ListItemText
                        primary={product.name}
                        secondary={`Cantidad: ${product.quantity} - Precio: ${product.price}€`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleLoadCart(cart)}
                  sx={{ mt: 2 }}
                >
                  Cargar
                </Button>
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
};

export default PreviousOrders;