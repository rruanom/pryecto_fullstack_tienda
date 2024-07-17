import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const numberItems = useSelector(state => state.numberItems);

  return (
    <Link to="/cart" className="cart-icon">
      🛒 <span>{numberItems}</span>
    </Link>
  );
};

export default CartIcon;