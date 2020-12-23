import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div onClick={()=>logout()}>
        Log Out
      </div>
    )
  );
};

// TODO carry on with auth0 stuff. https://auth0.com/blog/complete-guide-to-react-user-authentication/

export default LogoutButton;
