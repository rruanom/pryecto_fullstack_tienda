import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart, decreaseQuantity, increaseQuantity } from "../../../redux/cart/cartActions";

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cartItems);

    let TotalCart = items.reduce((total, item) => total + item.quantity * item.price, 0);

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
                {items.map((item, i) => (
                    <tr key={i}>
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
                    <td><b>{TotalCart.toFixed(2)} €</b></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Cart;