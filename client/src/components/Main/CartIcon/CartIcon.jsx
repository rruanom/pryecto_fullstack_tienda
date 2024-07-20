import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const numberItems = useSelector(state => state.cart.numberItems);

  return (
    <div className='cart-icon'>
    <Link to="/cart" className="cart-icon">
      🛒 <span>{numberItems}</span>
    </Link>
    </div>
  );
};

export default CartIcon;