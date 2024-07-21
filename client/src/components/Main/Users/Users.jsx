import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UserEditForm from './UserEditForm/UserEditForm';
import UserCreateForm from './UserCreateForm/UserCreateForm';
import UserTable from './UserTable/UserTable';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Error al cargar los usuarios');
      setIsLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (email) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await axios.delete('/api/users', { data: { email } });
        fetchUsers();
      } catch (err) {
        setError('Error al eliminar el usuario');
      }
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put('/api/users', updatedUser);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  const handleCreateUser = async (newUser) => {
    try {
      await axios.post('/api/users/register', newUser);
      setIsCreating(false);
      fetchUsers();
    } catch (err) {
      setError('Error al crear el usuario');
    }
  };

  if (isLoading) return <Typography>Cargando usuarios...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Lista de Usuarios</Typography>
      <Button variant="contained" color="primary" onClick={() => setIsCreating(true)} sx={{ mb: 2 }}>
        Crear Nuevo Usuario
      </Button>
      {isCreating && (
        <UserCreateForm onSave={handleCreateUser} onCancel={() => setIsCreating(false)} />
      )}
      <UserTable 
        users={users} 
        editingUser={editingUser} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onUpdate={handleUpdateUser}
        onCancelEdit={() => setEditingUser(null)}
      />
    </Box>
  );
};

export default Users;