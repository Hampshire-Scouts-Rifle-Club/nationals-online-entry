import React from 'react';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { Button } from '@material-ui/core';
import { useUserContext } from './UserContext';

function LoggedInUser(): JSX.Element {
  const { user } = useUserContext();

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

  const uiElement = user ? signOut : signIn;

  return uiElement;
}

export default LoggedInUser;
