import { signOut as authSignOut } from "aws-amplify/auth";

// Signing in is done with signInWithRedirect() at the call sites, so that
// aws-amplify owns the PKCE challenge and the OAuth state it later needs to
// redeem the returned code. A hand-built authorize URL cannot be redeemed:
// see B10 in docs/backlog.md.
export function getSignInOut(): { signOut: () => void } {
  const signOut = () => {
    authSignOut();
  };

  return { signOut };
}
