import React from 'react';
import {NavLink} from "react-router-dom";
import LogInOrOutButton from "../components/auth/LogInOrOutButton";

const routes = [
  {url: '/', name: 'Exercises'},
  {url: '/practices', name: 'Practices'}
]

function Nav() {
  return (
    <nav>
      <LogInOrOutButton/>
      {routes.map((route, i) => {
        return (
          <NavLink key={i} exact to={route.url}>{route.name}
          </NavLink>
        )
      })}
    </nav>
  )
}

export { Nav };

