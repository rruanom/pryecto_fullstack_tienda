// src/components/AuthChecker.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from '../../../redux/auth/authActions';

function AuthChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return null;
}

export default AuthChecker;