import { signInWithRedirect } from "aws-amplify/auth";
import { Button } from "@mui/material";

export function LoggedInUser(): JSX.Element {
  // const { user } = useUserContext();

  const signIn = (
    <Button
      variant="outlined"
      size="small"
      color="inherit"
      onClick={() => signInWithRedirect()}
    >
      Sign-In
    </Button>
  );
  // const signOut = (
  //   <Button
  //     variant="outlined"
  //     size="small"
  //     color="inherit"
  //     //   className={classes.button}
  //     onClick={() => authSignOut()}
  //   >
  //     Sign-Out
  //   </Button>
  // );

  const uiElement = signIn;

  return uiElement;
}
