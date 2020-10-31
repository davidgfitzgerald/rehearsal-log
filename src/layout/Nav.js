import React from 'react';
import { NavLink } from "react-router-dom";

const navs = [
  {url: '/', name: 'Home'},
  {url: '/about', name: 'About'},
  {url: '/contact', name: 'Contact'},
]

const Nav = () => (
  <nav className="bg-purple-700 text-purple-300 shadow">
    <ul className="flex justify-end">
      {navs.map((navItem, i) => {
        return (
          <li>
            <NavLink key={i} exact
                     className="flex space-x-5 p-10 rounded-lg
                     hover:bg-purple-600
                     active:bg-purple-800"
                     activeClassName="text-purple-100"
                     to={navItem.url}>{navItem.name}
            </NavLink>
          </li>)
      })}
    </ul>
  </nav>
);

export default Nav;

