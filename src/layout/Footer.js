import React from 'react';
import { APP_COLOUR_1, APP_COLOUR_2 } from '../utils/globals.json'
import Toggle from "../components/Toggle";

const Footer = () => (
    <footer className={"bg-"+APP_COLOUR_1+"-600 text-"+APP_COLOUR_1+"-300 shadow p-2"}>
      <ul className="flex mx-auto sm:mx-auto justify-center">
        <li className="m-2">
          <a href="/"
             className={"cbutton bg-"+APP_COLOUR_2+"-500 text-white"}>Home</a>
        </li>
        <li className="m-2">
          <Toggle/>
        </li>
      </ul>
    </footer>
);

export default Footer;

