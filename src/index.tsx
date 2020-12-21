import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Amplify from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import awsconfig from './aws-exports';

import * as serviceWorker from './serviceWorker';
import App from './App';

// Create a theme instance.
const theme = createMuiTheme({
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

// const federated = {
//   google_client_id: "640256100200-mgqh02vo0ep8m6tnaes4h8jnamncs4di.apps.googleusercontent.com",
//   facebook_client_id: "201867554548489"
// };

Amplify.configure(awsconfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
