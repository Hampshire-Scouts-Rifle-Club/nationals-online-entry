import { signOut as authSignOut } from "aws-amplify/auth";
import config from "./amplifyconfiguration.json";

export function getSignInOut(): { signInUrl: string; signOut: () => void } {
  const redirectSignIn = encodeURIComponent(config.oauth.redirectSignIn);
  const clientId = config.aws_user_pools_web_client_id;
  const signInUrl = `https://auth.nationalscoutriflechampionships.org.uk/oauth2/authorize?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${redirectSignIn}`;

  // Signing out by URL doesn't seem to work
  // const redirectSignOut = encodeURIComponent(
  //   currentAmplifyConfiguration.oauth.redirectSignOut
  // );
  // const authDomain = currentAmplifyConfiguration.oauth.domain;
  // const logOutUrl = `https://${authDomain}/logout?client_id=${clientId}&logout_uri=${redirectSignOut}`;

  const signOut = () => {
    authSignOut();
  };

  return { signInUrl, signOut };
}
