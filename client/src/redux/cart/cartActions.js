import { GET_ALL_PRODUCTS, ADD_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, DELETE_CART } from './cartTypes'

export const getAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    payload: products
})

export const addToCart = (product) => ({
    type: ADD_CART,
    payload: product
})

export const increaseQuantity = (index) => ({
    type: INCREASE_QUANTITY,
    payload: index
})

export const decreaseQuantity = (index) => ({
    type: DECREASE_QUANTITY,
    payload: index
})

export const deleteCart = (index) => ({
    type: DELETE_CART,
    payload: index
})