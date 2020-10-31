import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav className="bg-purple-500 text-white p-4 shadow">
    <ul className="flex space-x-20 justify-end m-5">
      <li><NavLink exact activeClassName="border-b-2 border-white" to="/" >Home</NavLink></li>
      <li><NavLink exact activeClassName="border-b-2 border-white" to="/about" >About</NavLink></li>
      <li><NavLink exact activeClassName="active" to="/contact" >Contact</NavLink></li>
    </ul>
  </nav>
);

export default Nav;

