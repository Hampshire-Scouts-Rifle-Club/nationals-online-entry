import React from "react";

import '../src/index.css';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';

import CssBaseline from "@mui/material/CssBaseline";

const muiTheme = createTheme(adaptV4Theme({
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
  }));

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={ muiTheme } >
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </StyledEngineProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}