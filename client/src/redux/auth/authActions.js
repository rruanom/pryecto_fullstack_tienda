import { 
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT
} from './authTypes';
import axios from 'axios';

// Acción para registrar un nuevo usuario
export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await axios.post('/api/users/register', userData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.user
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

// Acción para iniciar sesión
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

// Acción para cerrar sesión
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

// Acción para verificar si el usuario está autenticado (útil al cargar la aplicación)
export const checkAuthStatus = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/users/check-auth');
      if (response.data.isAuthenticated) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.user
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };
};

// Acción para actualizar la información del usuario
export const updateUserInfo = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('/api/users/update', userData);
      dispatch({
        type: LOGIN_SUCCESS, // Reutilizamos LOGIN_SUCCESS para actualizar la info del usuario
        payload: response.data.user
      });
      return Promise.resolve(response.data);
    } catch (error) {
      console.error('Error updating user info:', error);
      return Promise.reject(error);
    }
  };
};