import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import { Auth0Provider } from '@auth0/auth0-react'

const AuthDomain = process.env.REACT_APP_AUTH0_DOMAIN
const AuthClientID = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
  <Auth0Provider
    domain={AuthDomain}
    clientId={AuthClientID}
  redirectUri={window.location.origin}>
    <App/>
  </Auth0Provider>,
  document.getElementById('root')
)