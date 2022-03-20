import { CognitoUser } from '@aws-amplify/auth';

export interface UserProvider {
  user: CognitoUser | undefined;
  setUser: (newUser: CognitoUser | undefined) => void;
  initialise: () => void;
}

export const EmptyUserContext = {
  user: undefined,
  setUser: () => {
    // Do nothing
  },
  initialise: () => {
    // Do nothing
  },
};
