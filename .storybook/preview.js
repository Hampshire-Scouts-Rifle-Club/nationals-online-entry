import React from "react";

import '../src/index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import CssBaseline from "@material-ui/core/CssBaseline";

const muiTheme = createMuiTheme({
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

export const decorators = [
  (Story) => (
    <ThemeProvider theme={ muiTheme } >
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}