//import React from "react";
import { Route, Routes/* , Navigate */ } from "react-router-dom";
import Home from "./Home/Home";
import Cart from './Cart/Cart';
import Login from '../Main/Login/Login';
import Register from '../Main/Register/Register';
import Users from './Users/Users'





const Main = () => {
  return (
    <main className="main">
      <h1>SUPERMERCADO LONJA</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </main>
  );
};

export default Main;