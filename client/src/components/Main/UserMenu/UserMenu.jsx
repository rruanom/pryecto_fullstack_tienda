import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth/authActions';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  return (
    <div className="user-menu">
      <button onClick={() => setIsOpen(!isOpen)}>👤</button>
      {isLoggedIn && user && (
        <div className="user-greeting">
          Hola, {user.username}
        </div>
      )}
      {isOpen && (
        <div className="menu-content">
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          ) : user?.isAdmin ? (
            <>
              <Link to="/providers" onClick={() => setIsOpen(false)}>Providers</Link>
              <Link to="/categories" onClick={() => setIsOpen(false)}>Categories</Link>
              <Link to="/users" onClick={() => setIsOpen(false)}>Users</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;