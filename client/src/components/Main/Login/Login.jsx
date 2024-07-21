import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/auth/authActions';
import { useNavigate } from 'react-router-dom';
import { useAlertContext } from '../../Common/AlertContext/AlertContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { validateEmail, validatePassword } from '../../../utils/regexValidations';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useAlertContext();

  const validateForm = () => {
    let formErrors = {};
    
    if (!validateEmail(email)) {
      formErrors.email = "Por favor, introduce un email válido";
    }
    if (!validatePassword(password)) {
      formErrors.password = "La contraseña debe tener al menos 7 caracteres, una mayúscula, una minúscula y un número";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(loginUser({ email, password }));
        showSnackbar('Inicio de sesión exitoso', 'success');
        navigate('/');
      } catch (error) {
        console.error('Error logging in:', error);
        showSnackbar('Error al iniciar sesión. Por favor, intenta de nuevo.', 'error');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 3 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;