import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import Auth0ProviderWithHistory from './components/auth/auth0-provider-with-history'
import { Router } from "react-router";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App/>
    </Auth0ProviderWithHistory>
  </Router>
  ,
  document.getElementById('root')
)