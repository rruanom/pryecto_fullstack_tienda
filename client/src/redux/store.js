import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import cartReducer from "./cart/cartReducer";

const store = createStore(cartReducer, composeWithDevTools(applyMiddleware(logger)));

export default store;