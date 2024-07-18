import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import burgerIcon from "../../../assets/burger-icon.png";

const Nav = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);

  return (
    <nav className={`navbar`}>
      <input type="checkbox" id="menu" />
      <label htmlFor="menu"><img src={`${burgerIcon}`} alt="burger" width="24px" /></label>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/cart">Carrito</Link>
            </li>
            <li>
              <Link to="/loggin">Acceder</Link>
            </li>
          </>
        )}

        {isLoggedIn && !user?.isAdmin && (
          <>
            <li>
              <Link to="/cart">Carrito</Link>
            </li>
            <li>
              <Link to="/options">Opciones</Link>
            </li>
          </>
        )}

        {isLoggedIn && user?.isAdmin && (
          <>
            <li>
              <Link to="/users">Usuarios</Link>
            </li>
            <li>
              <Link to="/providers">Proveedores</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;