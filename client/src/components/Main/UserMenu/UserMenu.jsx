import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth/authActions';
import { Link } from 'react-router-dom';
import burgerIcon from "../../../assets/burger-icon.png";

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
      <div className="user-menu-container">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isLoggedIn && user?.image ? (
            <img 
              src={user.image} 
              alt={user.username} 
              className="user-icon"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = burgerIcon;
              }}
            />
          ) : (
            <img 
              src={burgerIcon} 
              alt="Menu" 
              className="burger-icon"
              width="24px"
            />
          )}
        </button>
        {isLoggedIn && user && (
          <span className="user-greeting">Hola, {user.username}</span>
        )}
      </div>
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