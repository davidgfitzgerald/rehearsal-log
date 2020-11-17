import React from 'react';
import {NavLink} from "react-router-dom";
import { APP_COLOUR_1 } from '../utils/globals.json'
const navs = [
  {url: '/', name: 'Practices'},
  {url: '/about', name: 'About'},
  {url: '/development', name: 'Development'},
]

const Nav = () => (

  <div className="">
    <nav className={"bg-"+APP_COLOUR_1+"-600 text-"+APP_COLOUR_1+"-200 shadow"}>
      <ul className="flex sm:mx-auto justify-center lg:justify-end">
        {navs.map((navItem, i) => {
          return (
            <li className="flex" key={i}>
              <NavLink key={i} exact
                       className={"space-x-5 p-10 hover:bg-" + APP_COLOUR_1 + "-500 hover:text-white"  }
                       activeClassName={"text-white text-xl bg-" + APP_COLOUR_1 + "-700"}
                       to={navItem.url}>{navItem.name}
              </NavLink>
            </li>)
        })}
      </ul>
    </nav>
  </div>
);

export { Nav };

