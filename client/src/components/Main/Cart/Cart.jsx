import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart, decreaseQuantity, increaseQuantity } from "../../../redux/cart/cartActions";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const totalCart = cartItems && cartItems.length > 0
        ? cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
        : 0;

    if (!cartItems || cartItems.length === 0) {
        return <p>Tu carrito está vacío.</p>;
    }

    return (
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
                {cartItems.map((item, i) => (
                    <tr key={item.id_product}>
                        <td><button onClick={() => dispatch(deleteCart(i))}>X</button></td>
                        <td>{item.name}</td>
                        <td><img src={item.image} alt={item.name} style={{ width: '100px', height: '80px' }} /></td>
                        <td>{item.price} €</td>
                        <td>
                            <button onClick={() => dispatch(decreaseQuantity(i))}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => dispatch(increaseQuantity(i))}>+</button>
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
    );
};

export default Cart;