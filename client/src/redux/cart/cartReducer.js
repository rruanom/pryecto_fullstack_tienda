import { GET_ALL_PRODUCTS, ADD_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, DELETE_CART } from './cartTypes'

const INITIAL_STATE = {
    numberItems: 0,
    cartItems: [],
    _products: []
}

function cartReducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                _products: action.payload
            }
        case ADD_CART:
            const existingItemIndex = state.cartItems.findIndex(item => item.id_product === action.payload.id_product);
            if (existingItemIndex >= 0) {
                // Create a new array with the updated item
                const newCartItems = state.cartItems.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return {
                    ...state,
                    cartItems: newCartItems,
                    numberItems: state.numberItems + 1
                }
            } else {
                const newItem = {
                    ...action.payload,
                    quantity: 1
                }
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem],
                    numberItems: state.numberItems + 1
                }
            }
        case INCREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((item, index) => 
                    index === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
                numberItems: state.numberItems + 1
            }
        case DECREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((item, index) => 
                    index === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ).filter((item, index) => index !== action.payload || item.quantity > 1),
                numberItems: state.numberItems - 1
            }
        case DELETE_CART:
            const itemToRemove = state.cartItems[action.payload];
            return {
                ...state,
                cartItems: state.cartItems.filter((_, index) => index !== action.payload),
                numberItems: state.numberItems - (itemToRemove ? itemToRemove.quantity : 0)
            }
        default:
            return state;
    }
}

export default cartReducer;