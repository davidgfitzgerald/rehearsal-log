import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import Auth0ProviderWithHistory from './components/auth/auth0-provider-with-history'
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App/>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  ,
  document.getElementById('root')
)