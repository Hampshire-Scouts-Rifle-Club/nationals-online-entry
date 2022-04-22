import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Amplify, { Auth } from 'aws-amplify';
import awsExports from './aws-exports';

import * as serviceWorker from './serviceWorker';
import { App } from './App';

const correctRedirectUris = () => {
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  // Assuming you have two redirect URIs, and the first is for
  // localhost and second is for production
  const [localRedirectSignIn, productionRedirectSignIn] =
    awsExports.oauth.redirectSignIn.split(',');

  const [localRedirectSignOut, productionRedirectSignOut] =
    awsExports.oauth.redirectSignOut.split(',');

  const updatedAwsConfig = {
    ...awsExports,
    oauth: {
      ...awsExports.oauth,
      redirectSignIn: isLocalhost
        ? localRedirectSignIn
        : productionRedirectSignIn,
      redirectSignOut: isLocalhost
        ? localRedirectSignOut
        : productionRedirectSignOut,
    },
  };

  Amplify.configure(updatedAwsConfig);
};

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#4862b2',
      main: '#003982',
      dark: '#001555',
      contrastText: '#fff',
    },
    secondary: {
      light: '#60db7d',
      main: '#22a84f',
      dark: '#007823',
      contrastText: '#fff',
    },
  },
});

Amplify.configure(awsExports);
correctRedirectUris();
console.log(JSON.stringify(Auth.configure()));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
