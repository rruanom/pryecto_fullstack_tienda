import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, styled } from '@mui/material';
import UserEditForm from '../UserEditForm/UserEditForm';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.MuiButton-containedSecondary': {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const UserTable = ({ users, editingUser, onEdit, onDelete, onUpdate, onCancelEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id_user}>
              {editingUser && editingUser.id_user === user.id_user ? (
                <TableCell colSpan={4}>
                  <UserEditForm user={editingUser} onUpdate={onUpdate} onCancel={onCancelEdit} />
                </TableCell>
              ) : (
                <>
                  <TableCell>{user.name} {user.lastname}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <ActionButton variant="contained" color="primary" onClick={() => onEdit(user)}>
                      Editar
                    </ActionButton>
                    <ActionButton variant="contained" color="secondary" onClick={() => onDelete(user.email)}>
                      Eliminar
                    </ActionButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;