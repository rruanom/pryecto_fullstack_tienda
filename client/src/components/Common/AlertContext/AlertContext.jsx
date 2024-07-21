import React, { createContext, useState, useContext } from 'react';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

const AlertContext = createContext();

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', content: '', onConfirm: () => {} });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showConfirmDialog = (title, content, onConfirm) => {
    setConfirmDialog({ open: true, title, content, onConfirm });
  };

  const hideConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const hideSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AlertContext.Provider value={{ showConfirmDialog, showSnackbar }}>
      {children}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={hideConfirmDialog}
        onConfirm={() => {
          confirmDialog.onConfirm();
          hideConfirmDialog();
        }}
        title={confirmDialog.title}
        content={confirmDialog.content}
      />
      <CustomSnackbar
        open={snackbar.open}
        onClose={hideSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </AlertContext.Provider>
  );
};