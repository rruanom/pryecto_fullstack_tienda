import { 
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT
  } from './authTypes';
  import axios from 'axios';
  
  export const registerUser = (userData) => {
    return async (dispatch) => {
      dispatch({ type: REGISTER_REQUEST });
      try {
        const response = await axios.post('/api/users/registro', userData);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.response ? error.response.data.msg : 'Error en el registro'
        });
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
          payload: response.data
        });
      } catch (error) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: error.response ? error.response.data.msg : 'Error en el login'
        });
      }
    };
  };
  
  export const logoutUser = () => {
    return async (dispatch) => {
      try {
        await axios.post('/api/users/logout');
        dispatch({ type: LOGOUT });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
  };