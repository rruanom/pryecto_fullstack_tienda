import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart, decreaseQuantity, increaseQuantity, clearCart } from "../../../redux/cart/cartActions";
import axios from 'axios';
import PreviousOrders from './PreviousOrders';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Typography, Box, IconButton, useMediaQuery, useTheme 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const [showPreviousOrders, setShowPreviousOrders] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const totalCart = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleSendCart = async () => {
        if (isLoggedIn) {
            try {
                await axios.post('/api/oldcarts', { 
                    email: user.email, 
                    cart: cartItems
                });
                alert("Pedido guardado con éxito");
                dispatch(clearCart());
            } catch (error) {
                console.error("Error al guardar el carrito", error);
                alert("Error al guardar el pedido");
            }
        } else {
            alert("Pedido enviado");
            dispatch(clearCart());
        }
    };

    const togglePreviousOrders = () => {
        setShowPreviousOrders(!showPreviousOrders);
    };

    const handleClearCart = () => {
        if (window.confirm("¿Estás seguro de que quieres limpiar todo el carrito?")) {
            dispatch(clearCart());
        }
    };

    const MobileCartItem = ({ item }) => (
        <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                <Typography variant="subtitle1">{item.name}</Typography>
                <IconButton onClick={() => dispatch(deleteCart(item.id_product))} size="small">
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Precio: {item.price}€</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => dispatch(decreaseQuantity(item.id_product))} size="small">
                        <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => dispatch(increaseQuantity(item.id_product))} size="small">
                        <AddIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2">Total: {(item.price * item.quantity).toFixed(2)}€</Typography>
            </Box>
        </Box>
    );

    const buttonStyle = {
        marginBottom: '10px',
        width: isMobile ? 'auto' : 'inherit',
        minWidth: 'max-content'
    };

    return (
        <div className='cart'>
            {cartItems.length === 0 ? (
                <Typography>El carrito está vacío.</Typography>
            ) : (
                isMobile ? (
                    <Box>
                        {cartItems.map((item) => (
                            <MobileCartItem key={item.id_product} item={item} />
                        ))}
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Imagen</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id_product}>
                                        <TableCell>
                                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.price}€</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => dispatch(decreaseQuantity(item.id_product))} size="small">
                                                <RemoveIcon />
                                            </IconButton>
                                            {item.quantity}
                                            <IconButton onClick={() => dispatch(increaseQuantity(item.id_product))} size="small">
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{(item.price * item.quantity).toFixed(2)}€</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => dispatch(deleteCart(item.id_product))} size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            )}
            <Box sx={{ 
                mt: 2, 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: isMobile ? 2 : 0
            }}>
                <Typography variant="h6">Total del carrito: {totalCart.toFixed(2)}€</Typography>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 1, 
                    width: isMobile ? '100%' : 'auto'
                }}>
                    {cartItems.length > 0 && (
                        <>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleSendCart} 
                                size="small"
                                sx={buttonStyle}
                            >
                                Enviar Pedido
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={handleClearCart} 
                                size="small"
                                sx={buttonStyle}
                            >
                                Limpiar Carrito
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button 
                            variant="outlined" 
                            onClick={togglePreviousOrders} 
                            size="small"
                            sx={buttonStyle}
                        >
                            {showPreviousOrders ? "Ocultar Pedidos Anteriores" : "Ver Pedidos Anteriores"}
                        </Button>
                    )}
                </Box>
            </Box>
            {isLoggedIn && showPreviousOrders && <PreviousOrders />}
        </div>
    );
};

export default Cart;