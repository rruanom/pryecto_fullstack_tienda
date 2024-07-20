import { ADD_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, DELETE_CART, CLEAR_CART } from './cartTypes';

const initialState = {
  numberItems: 0,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      const existItem = state.cartItems.find(item => item.id_product === action.payload.id_product);
      if (existItem) {
        return {
          ...state,
          numberItems: state.numberItems + 1,
          cartItems: state.cartItems.map(item =>
            item.id_product === action.payload.id_product
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          numberItems: state.numberItems + 1,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }

    case INCREASE_QUANTITY:
      return {
        ...state,
        numberItems: state.numberItems + 1,
        cartItems: state.cartItems.map(item =>
          item.id_product === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        numberItems: state.numberItems - 1,
        cartItems: state.cartItems.map(item =>
          item.id_product === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0)
      };

    case DELETE_CART:
      const itemToDelete = state.cartItems.find(item => item.id_product === action.payload);
      return {
        ...state,
        numberItems: state.numberItems - itemToDelete.quantity,
        cartItems: state.cartItems.filter(item => item.id_product !== action.payload)
      };

    case CLEAR_CART:  // Nuevo caso para limpiar el carrito
      return {
        ...state,
        numberItems: 0,
        cartItems: []
      };

    default:
      return state;
  }
};

export default cartReducer;