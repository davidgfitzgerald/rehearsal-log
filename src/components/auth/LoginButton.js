import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { COLOURS } from '../../utils/globals.json'

const SECONDARY_COLOUR = COLOURS.SECONDARY;

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className={"flex cbutton1 bg-"+SECONDARY_COLOUR+"-500 text-white m-2"} onClick={() => loginWithRedirect({
        screen_hint: "signup",
      })}>
        Log In
      </button>
    )
  );
};

export default LoginButton;
