import React from 'react';
import { useHistory } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({children}) => {
  const AuthDomain = process.env.REACT_APP_AUTH0_DOMAIN;
  const AuthClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
    domain={AuthDomain}
    clientId={AuthClientID}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
