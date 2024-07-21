import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import burgerIcon from "../../../assets/burger-icon.png";

const Nav = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 750) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth < 750) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 750) {
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 750) {
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`navbar ${isOpen ? 'open' : ''}`} 
      ref={navRef} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="menu-icon">
        <img src={burgerIcon} alt="burger" width="24px" />
      </div>
      <ul>
        <li>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
        </li>
        
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/cart" onClick={handleLinkClick}>Carrito</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLinkClick}>Acceder</Link>
            </li>
          </>
        )}

        {isLoggedIn && !user?.isAdmin && (
          <>
            <li>
              <Link to="/cart" onClick={handleLinkClick}>Carrito</Link>
            </li>
            <li>
              <Link to="/options" onClick={handleLinkClick}>Opciones</Link>
            </li>
          </>
        )}

        {isLoggedIn && user?.isAdmin && (
          <>
            <li>
              <Link to="/users" onClick={handleLinkClick}>Usuarios</Link>
            </li>
            <li>
              <Link to="/providers" onClick={handleLinkClick}>Proveedores</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;