import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth/authActions';
import { Link, useNavigate } from 'react-router-dom';
import burgerIcon from "../../../assets/icono_usuario.png";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
    navigate('/');
  };

  useEffect(() => {
    setIsOpen(false);
  }, [auth.isLoggedIn]);

  return (
    <div className="user-menu">
      <div className="user-menu-container">
        <button onClick={() => setIsOpen(!isOpen)}>
          {auth.isLoggedIn && auth.user?.image ? (
            <img 
              src={auth.user.image} 
              alt={auth.user.username} 
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
        {auth.isLoggedIn && auth.user && (
          <span className="user-greeting">Hola, {auth.user.username}</span>
        )}
      </div>
      {isOpen && (
        <div className="menu-content">
          {!auth.isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          ) : auth.user?.isAdmin ? (
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