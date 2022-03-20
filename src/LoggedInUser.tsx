import React from 'react';
import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { useUserContext } from './UserContext';

function LoggedInUser(): JSX.Element {
  // const { user } = useUserContext();

  const signIn = (
    <Button
      variant="outlined"
      size="small"
      color="inherit"
      onClick={() => Auth.federatedSignIn()}
    >
      Sign-In
    </Button>
  );
  const signOut = (
    <Button
      variant="outlined"
      size="small"
      color="inherit"
      //   className={classes.button}
      onClick={() => Auth.signOut()}
    >
      Sign-Out
    </Button>
  );

  const uiElement = signIn;

  return uiElement;
}

export default LoggedInUser;
