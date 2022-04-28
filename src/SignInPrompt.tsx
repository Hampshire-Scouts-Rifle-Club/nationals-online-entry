import { Alert, Button } from '@mui/material';
import { getSignInOut } from './SignInSignOut';

export function SignInPrompt() {
  const { signInUrl } = getSignInOut();
  return (
    <Alert
      severity="info"
      action={
        <Button color="inherit" size="small" href={signInUrl}>
          Sign in
        </Button>
      }
    >
      Sign in to save your progress
    </Alert>
  );
}
