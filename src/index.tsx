import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Amplify, { Auth } from 'aws-amplify';
import awsExports from './aws-exports';

import * as serviceWorker from './serviceWorker';
import App from './App';

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
