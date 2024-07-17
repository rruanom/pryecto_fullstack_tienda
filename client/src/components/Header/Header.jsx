import Navbar from "./Navbar/Navbar";
import CartIcon from '../Main/CartIcon/CartIcon';
import UserMenu from '../Main/UserMenu/UserMenu';

const Header = () => {

  return <header className={`header`}>
    <CartIcon /> {/* Añadimos el CartIcon aquí */}
    <Navbar/>
    <UserMenu />
    </header>;
};

export default Header;
