import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { validatePrice, validateImageUrl } from '../../../../utils/regexValidations';

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

const UserEditForm = ({ user, onUpdate, onCancel }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!validateName(editedUser.name)) formErrors.name = "Nombre inválido";
    if (!validateName(editedUser.lastname)) formErrors.lastname = "Apellido inválido";
    if (!validateUsername(editedUser.username)) formErrors.username = "Nombre de usuario inválido";
    if (!validateEmail(editedUser.email)) formErrors.email = "Email inválido";
    if (editedUser.image && !validateImageUrl(editedUser.image)) formErrors.image = "URL de imagen inválida";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(editedUser);
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
        value={editedUser.name}
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
        value={editedUser.lastname}
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
        value={editedUser.username}
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
        value={editedUser.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        margin="normal"
        fullWidth
        name="image"
        label="URL de la imagen"
        value={editedUser.image}
        onChange={handleChange}
        error={!!errors.image}
        helperText={errors.image}
      />
      <StyledButton type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
        Actualizar
      </StyledButton>
      <StyledButton fullWidth variant="outlined" onClick={onCancel} sx={{ mb: 2 }}>
        Cancelar
      </StyledButton>
    </Box>
  );
};

export default UserEditForm;