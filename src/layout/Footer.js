import React from 'react';
import { COLOURS } from '../utils/globals.json'
// import Toggle from "../components/Toggle";

const PRIMARY_COLOUR = COLOURS.PRIMARY;
const SECONDARY_COLOUR = COLOURS.SECONDARY;

const Footer = () => (
    <footer className={"bg-"+PRIMARY_COLOUR+"-600 text-"+PRIMARY_COLOUR+"-300 shadow p-2"}>
      <ul className="flex mx-auto sm:mx-auto justify-center">
        <li className="m-2">
          <a href="/"
             className={"cbutton1 bg-"+SECONDARY_COLOUR+"-500 text-white"}>Home</a>
        </li>
        {/*<li className="m-2">*/}
        {/*  <Toggle/>*/}
        {/*</li>*/}
      </ul>
    </footer>
);

export { Footer };

