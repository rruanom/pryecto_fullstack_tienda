//import React from "react";
import { Route, Routes/* , Navigate */ } from "react-router-dom";
import Home from "./Home/Home";
import Cart from './Cart/Cart';
/* import Cart from "./Cart/Cart";
import UserLoggin from "./UserLoggin/UserLoggin";
import UserOptions from "./UserOptions/UserOptions";
import Providers from "./Providers/Providers";
import Users from "./Users/Users" */




const Main = () => {
  return (
    <main className="main">
      <h1>SUPERMERCADO LONJA</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      {/*   <Route path="/cart" element={<Cart />} />
        <Route path="/loggin" element={<UserLoggin />} />
        <Route path="/options" element={<UserOptions />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/*" element={<Navigate to={"/"} />} /> */}
      </Routes>
    </main>
  );
};

export default Main;