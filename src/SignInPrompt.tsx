import { Alert, Button } from '@mui/material';
import { signInWithRedirect } from 'aws-amplify/auth';

export function SignInPrompt() {
  return (
    <Alert
      severity="info"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => {
            signInWithRedirect();
          }}
        >
          Sign in
        </Button>
      }
    >
      Sign in to save your progress
    </Alert>
  );
}
