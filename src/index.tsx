import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  Theme,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

import * as serviceWorker from './serviceWorker';
import { AppRoutes } from './AppRoutes';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const configureAmplify = () => {
  const isDev = () =>
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  const localRedirectSignIn = 'http://localhost:3000';
  const localClientId = '5ofjg01kui3ue7a137qicdtgri';
  const redirectSignIn = isDev()
    ? localRedirectSignIn
    : awsExports.oauth.redirectSignIn;
  const clientId = isDev()
    ? localClientId
    : awsExports.aws_user_pools_web_client_id;

  const updatedAwsConfig = {
    ...awsExports,
    aws_user_pools_web_client_id: clientId,
    oauth: {
      ...awsExports.oauth,
      redirectSignIn,
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

configureAmplify();

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
