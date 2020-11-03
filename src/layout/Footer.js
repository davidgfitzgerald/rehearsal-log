import React from 'react';
import { APP_COLOUR_1, APP_COLOUR_2 } from '../globals.json'

const Footer = () => (
    <footer className={"bg-"+APP_COLOUR_1+"-600 text-"+APP_COLOUR_1+"-300 shadow p-2"}>
      <ul className="sm:mx-auto justify-center lg:justify-end">
        <li className="flex justify-center mx-auto">
          <a href="/"
             className={"inline-block px-5 py-3 shadow-2xl rounded-md " +
             "bg-"+APP_COLOUR_2+"-500 text-white text-md font-semibold tracking-wide"}>Home</a>
        </li>
      </ul>
    </footer>
);

export default Footer;

