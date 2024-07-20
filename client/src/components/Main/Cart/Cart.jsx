import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart, decreaseQuantity, increaseQuantity, clearCart } from "../../../redux/cart/cartActions";
import axios from 'axios';
import PreviousOrders from './PreviousOrders';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const [showPreviousOrders, setShowPreviousOrders] = useState(false);

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

    return (
        <div className='cart'>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id_product}>
                                <td><button onClick={() => dispatch(deleteCart(item.id_product))}>X</button></td>
                                <td>{item.name}</td>
                                <td><img src={item.image} alt={item.name} style={{ width: '100px', height: '80px' }} /></td>
                                <td>{item.price} €</td>
                                <td>
                                    <button onClick={() => dispatch(decreaseQuantity(item.id_product))}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(increaseQuantity(item.id_product))}>+</button>
                                </td>
                                <td><b>{(item.price * item.quantity).toFixed(2)} €</b></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5">Total: </td>
                            <td><b>{totalCart.toFixed(2)} €</b></td>
                        </tr>
                    </tbody>
                </table>
            )}
            <div>
                {cartItems.length > 0 && (
                    <>
                        <button onClick={handleSendCart}>Enviar Pedido</button>
                        <button onClick={handleClearCart}>Limpiar Carrito</button>
                    </>
                )}
                {isLoggedIn && (
                    <button onClick={togglePreviousOrders}>
                        {showPreviousOrders ? "Ocultar Pedidos Anteriores" : "Ver Pedidos Anteriores"}
                    </button>
                )}
            </div>
            {isLoggedIn && showPreviousOrders && <PreviousOrders />}
        </div>
    );
};

export default Cart;