import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../redux/auth/authActions';
import { useNavigate } from 'react-router-dom';
import { useAlertContext } from '../../Common/AlertContext/AlertContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
  },
});

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useAlertContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      lastname,
      username,
      email,
      password,
      image,
      isadmin: false,
      last_logged_date: new Date().toISOString()
    };
    try {
      await dispatch(registerUser(userData));
      showSnackbar(`Se ha registrado el usuario ${username}. Por favor, inicie sesión.`, 'success');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      showSnackbar('Hubo un error al registrar el usuario. Por favor, intente de nuevo.', 'error');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 3 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Registro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Apellido"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="image"
            label="URL de la imagen"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Register;