import axios from 'axios';
import { 
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT
} from './authTypes';

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await axios.post('/api/users/register', userData);
      dispatch({
        type: REGISTER_SUCCESS,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response ? error.response.data.message : 'Error en el registro'
      });
      return Promise.reject(error);
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post('/api/users/login', credentials);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.user
      });
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response ? error.response.data.message : 'Error en el login'
      });
      return Promise.reject(error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      await axios.post('/api/users/logout', {}, { withCredentials: true });
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
};

export const checkAuthStatus = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/users/check-auth', { withCredentials: true });
      if (response.data.isAuthenticated) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.user
        });
      } else {
        dispatch({ type: LOGOUT });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      dispatch({ type: LOGOUT });
    }
  };
};