import React from 'react';
import { NavLink } from "react-router-dom";
import { COLOURS } from '../utils/globals.json'

const PRIMARY_COLOUR = COLOURS.PRIMARY
const navs = [
  {url: '/', name: 'Exercises'},
  {url: '/practices', name: 'Practices'}
]

const Nav = () => (

  <nav className={"bg-"+PRIMARY_COLOUR+"-600 text-"+PRIMARY_COLOUR+"-200 shadow mb-5"}>
    <ul className="flex sm:mx-auto justify-center lg:justify-end">
      {navs.map((navItem, i) => {
        return (
          <li className="flex" key={i}>
            <NavLink key={i} exact
                     className={"space-x-5 p-10 hover:bg-" + PRIMARY_COLOUR + "-500 hover:text-white"  }
                     activeClassName={"text-white text-xl bg-" + PRIMARY_COLOUR + "-700"}
                     to={navItem.url}>{navItem.name}
            </NavLink>
          </li>)
      })}
    </ul>
  </nav>
);

export { Nav };

