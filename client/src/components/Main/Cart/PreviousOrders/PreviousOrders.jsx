import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, addToCart } from "../../../../redux/cart/cartActions";
import axios from 'axios';

const PreviousOrders = () => {
    const [previousCarts, setPreviousCarts] = useState([]);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPreviousCarts = async () => {
            try {
                const response = await axios.get(`/api/oldcarts/${user.email}`);
                setPreviousCarts(response.data);
            } catch (error) {
                console.error("Error fetching previous carts", error);
            }
        };

        if (user) {
            fetchPreviousCarts();
        }
    }, [user]);

    const handleLoadCart = (cart) => {
        if (window.confirm("¿Estás seguro de que quieres cambiar el carrito actual por este pedido anterior?")) {
            dispatch(clearCart());
            cart.products.forEach(product => {
                dispatch(addToCart(product));
            });
        }
    };

    return (
        <div>
            <h2>Pedidos Anteriores</h2>
            {previousCarts.map((cart, index) => (
                <div key={index} onClick={() => handleLoadCart(cart)} style={{cursor: 'pointer'}}>
                    <h3>Pedido del {new Date(cart.date).toLocaleDateString()}</h3>
                    <p>Número de productos: {cart.products.length}</p>
                    <p>Precio final: {cart.products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}€</p>
                </div>
            ))}
        </div>
    );
};

export default PreviousOrders;