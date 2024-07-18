import { ADD_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, DELETE_CART } from './cartTypes';

export const addToCart = (product) => ({
  type: ADD_CART,
  payload: product
});

export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId
});

export const deleteCart = (productId) => ({
  type: DELETE_CART,
  payload: productId
});
