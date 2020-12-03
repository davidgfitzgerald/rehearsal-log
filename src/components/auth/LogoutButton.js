import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { COLOURS } from '../../utils/globals.json'

const SECONDARY_COLOUR = COLOURS.SECONDARY;

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className={"flex cbutton1 bg-"+SECONDARY_COLOUR+"-500 text-white m-2"} onClick={()=>logout()}>
        Log Out
      </div>
    )
  );
};

// TODO carry on with auth0 stuff. https://auth0.com/blog/complete-guide-to-react-user-authentication/

export default LogoutButton;
