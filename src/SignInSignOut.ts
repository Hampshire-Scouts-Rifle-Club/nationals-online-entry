import { Amplify, Auth } from 'aws-amplify';

export function getSignInOut(): { signInUrl: string; signOut: () => void } {
  const currentAmplifyConfiguration = Amplify.configure() as any;
  const redirectSignIn = encodeURIComponent(
    currentAmplifyConfiguration.oauth.redirectSignIn
  );
  const clientId = currentAmplifyConfiguration.aws_user_pools_web_client_id;
  const signInUrl = `https://auth.nationalscoutriflechampionships.org.uk/oauth2/authorize?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${redirectSignIn}`;

  // Signing out by URL doesn't seem to work
  // const redirectSignOut = encodeURIComponent(
  //   currentAmplifyConfiguration.oauth.redirectSignOut
  // );
  // const authDomain = currentAmplifyConfiguration.oauth.domain;
  // const logOutUrl = `https://${authDomain}/logout?client_id=${clientId}&logout_uri=${redirectSignOut}`;

  const signOut = () => {
    Auth.signOut();
  };

  return { signInUrl, signOut };
}
