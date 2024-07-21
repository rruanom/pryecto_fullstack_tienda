import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  if (isLoading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-container">
      <h2>Lista de Usuarios</h2>
      <button className="create-user-btn" onClick={() => setIsCreating(true)}>Crear Nuevo Usuario</button>
      {isCreating && (
        <UserCreateForm onSave={handleCreateUser} onCancel={() => setIsCreating(false)} />
      )}
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Username</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id_user}>
              {editingUser && editingUser.id_user === user.id_user ? (
                <td colSpan="4">
                  <UserEditForm user={editingUser} onUpdate={handleUpdateUser} onCancel={() => setEditingUser(null)} />
                </td>
              ) : (
                <>
                  <td data-label="Nombre">{user.name} {user.lastname}</td>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Acciones">
                    <button className="edit-btn" onClick={() => handleEdit(user)}>Editar</button>
                    <button className="delete-btn" onClick={() => handleDelete(user.email)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserEditForm = ({ user, onUpdate, onCancel }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form user-edit-form">
      <input name="name" value={editedUser.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="lastname" value={editedUser.lastname} onChange={handleChange} placeholder="Apellido" required />
      <input name="username" value={editedUser.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={editedUser.email} onChange={handleChange} placeholder="Email" required type="email" />
      <input name="image" value={editedUser.image} onChange={handleChange} placeholder="URL de la imagen" />
      <div className="form-actions">
        <button type="submit">Actualizar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

const UserCreateForm = ({ onSave, onCancel }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newUser);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form user-create-form">
      <input name="name" value={newUser.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="lastname" value={newUser.lastname} onChange={handleChange} placeholder="Apellido" required />
      <input name="username" value={newUser.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={newUser.email} onChange={handleChange} placeholder="Email" required type="email" />
      <input name="password" value={newUser.password} onChange={handleChange} placeholder="Contraseña" required type="password" />
      <input name="image" value={newUser.image} onChange={handleChange} placeholder="URL de la imagen" />
      <div className="form-actions">
        <button type="submit">Crear Usuario</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default Users;