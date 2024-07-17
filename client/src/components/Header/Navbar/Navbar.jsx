import { Link } from "react-router-dom";
import burgerIcon from "../../../assets/burger-icon.png";

const Nav = () => {

  return (
    <nav className={`navbar`}>
      <input type="checkbox" id="menu" />
      <label htmlFor="menu"><img src={`${burgerIcon}`} alt="burger" width="24px" /></label>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Carrito</Link>
        </li>
        <li>
          <Link to="/loggin">Acceder</Link>
        </li>
        <li>
          <Link to="/options">Opciones</Link>
        </li>
        <li>
          <Link to="/providers">Proveedores</Link>
        </li>
        <li>
          <Link to="/users">usuarios</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;