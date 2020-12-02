import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { COLOURS } from '../../utils/globals.json'

const SECONDARY_COLOUR = COLOURS.SECONDARY;

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className={"cbutton1 bg-"+SECONDARY_COLOUR+"-500 text-white m-2"} onClick={()=>logout()}>
        Log Out
      </div>
    )
  );
};

export default LogoutButton;
