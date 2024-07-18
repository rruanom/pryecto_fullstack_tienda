import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartReducer';
import authReducer from './auth/authReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;