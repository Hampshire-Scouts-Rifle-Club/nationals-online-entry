import { CognitoUser } from '@aws-amplify/auth';

export interface UserProvider {
  user: CognitoUser | undefined;
  setUser: (newUser: CognitoUser | undefined) => void;
}

export const EmptyUserContext = {
  user: undefined,
  setUser: (newUser: CognitoUser | undefined) => {
    // Do nothing
  },
};
