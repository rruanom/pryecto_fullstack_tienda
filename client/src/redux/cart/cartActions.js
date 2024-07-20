export const ADD_CART = 'ADD_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const DELETE_CART = 'DELETE_CART'
export const CLEAR_CART = 'CLEAR_CART'  // Nueva acción

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

export const clearCart = () => ({  // Nueva acción para limpiar el carrito
  type: CLEAR_CART
});