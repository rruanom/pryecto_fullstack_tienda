import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { validateName, validateUsername, validateEmail, validatePassword, validateImageUrl } from '../../../../utils/regexValidations';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.MuiButton-outlined': {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const UserCreateForm = ({ onSave, onCancel }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!validateName(newUser.name)) formErrors.name = "Nombre inválido";
    if (!validateName(newUser.lastname)) formErrors.lastname = "Apellido inválido";
    if (!validateUsername(newUser.username)) formErrors.username = "Nombre de usuario inválido";
    if (!validateEmail(newUser.email)) formErrors.email = "Email inválido";
    if (!validatePassword(newUser.password)) formErrors.password = "Contraseña inválida";
    if (newUser.image && !validateImageUrl(newUser.image)) formErrors.image = "URL de imagen inválida";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(newUser);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="name"
        label="Nombre"
        value={newUser.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="lastname"
        label="Apellido"
        value={newUser.lastname}
        onChange={handleChange}
        error={!!errors.lastname}
        helperText={errors.lastname}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="username"
        label="Nombre de usuario"
        value={newUser.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email"
        type="email"
        value={newUser.email}
        onChange={handleChange}
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
        value={newUser.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        margin="normal"
        fullWidth
        name="image"
        label="URL de la imagen"
        value={newUser.image}
        onChange={handleChange}
        error={!!errors.image}
        helperText={errors.image}
      />
      <StyledButton type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
        Crear Usuario
      </StyledButton>
      <StyledButton fullWidth variant="outlined" onClick={onCancel} sx={{ mb: 2 }}>
        Cancelar
      </StyledButton>
    </Box>
  );
};

export default UserCreateForm;