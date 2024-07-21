import Navbar from "./Navbar/Navbar";
import CartIcon from '../Main/CartIcon/CartIcon';
import UserMenu from '../Main/UserMenu/UserMenu';

const Header = () => {

  return <header className='header'>
    <UserMenu />
    <Navbar/>
    <CartIcon />
    </header>;
};

export default Header;
