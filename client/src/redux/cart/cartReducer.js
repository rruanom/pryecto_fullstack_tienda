import { GET_ALL_PRODUCTS, ADD_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, DELETE_CART } from './cartTypes'

const INITIAL_STATE = {
    numberItems: 0,
    cartItems: [],
    _products: []
}

function cartReducer(state = INITIAL_STATE, action) { 
    let newCart = [...state.cartItems]

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                _products: action.payload
            }
        case ADD_CART:
            let addedItem = state.cartItems.find(item => item.id_product === action.payload.id_pproduct)
            if (addedItem) {
                addedItem.quantity += 1
                return {
                    ...state,
                    numberItems: state.numberItems + 1
                }
            } else {
                let newItem = {
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
            newCart[action.payload].quantity++
            return {
                ...state,
                cartItems: newCart,
                numberItems: state.numberItems + 1
            }
        case DECREASE_QUANTITY:
            if (newCart[action.payload].quantity > 1) {
                newCart[action.payload].quantity--
                return {
                    ...state,
                    cartItems: newCart,
                    numberItems: state.numberItems - 1
                }
            } else {
                return {
                    ...state,
                    cartItems: state.cartItems.filter((item, index) => index !== action.payload),
                    numberItems: state.numberItems - 1
                }
            }
        case DELETE_CART:
            let quantity = newCart[action.payload].quantity
            return {
                ...state,
                cartItems: state.cartItems.filter((item, index) => index !== action.payload),
                numberItems: state.numberItems - quantity
            }
        default:
            return state;
    }
}

export default cartReducer;