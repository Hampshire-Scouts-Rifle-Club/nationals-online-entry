import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import './index.css';
import { AppRoutes } from './AppRoutes.tsx';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const configureAmplify = () => {
  const isDev = import.meta.env.DEV;

  const localRedirectSignIn = 'http://localhost:5173';
  const localRedirectSignOut = 'http://localhost:5173/logout';
  const localClientId = '5ofjg01kui3ue7a137qicdtgri';

  const redirectSignIn = isDev
    ? localRedirectSignIn
    : config.oauth.redirectSignIn;
  const redirectSignOut = isDev
    ? localRedirectSignOut
    : config.oauth.redirectSignOut;
  const clientId = isDev ? localClientId : config.aws_user_pools_web_client_id;

  const updatedAwsConfig = {
    ...config,
    aws_user_pools_web_client_id: clientId,
    oauth: {
      ...config.oauth,
      redirectSignIn,
      redirectSignOut,
    },
  };

  Amplify.configure(updatedAwsConfig);
};

// Create a theme instance.
// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#4862b2",
//       main: "#003982",
//       dark: "#001555",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#60db7d",
//       main: "#22a84f",
//       dark: "#007823",
//       contrastText: "#fff",
//     },
//   },
// });

// Create a theme instance.
const theme = createTheme(
  adaptV4Theme({
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
  }),
);

configureAmplify();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
