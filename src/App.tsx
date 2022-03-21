import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import createPersistedState from 'use-persisted-state';
import { Auth, Hub } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line
import '@aws-amplify/ui-react/styles.css';
import AmazonCognitoIdentity, {
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { Button } from '@material-ui/core';

import Shooters from './Shooters';
import Camping from './Camping';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';
import TopBar from './TopBar';
import { CampBooking, EmptyCampBooking } from './CampBooking';
import { EmergencyContact, EmptyEmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import SaveState from './SaveState';
import awsExports from './aws-exports';

function App(): JSX.Element {
  const usePersistedEntriesState = createPersistedState<IndividualEntry[]>(
    'scoutnationalsentries'
  );
  const usePersistedCampBookingState = createPersistedState<CampBooking>(
    'scoutnationalscampbooking'
  );
  const usePersistedOnSiteEmergencyContactState =
    createPersistedState<EmergencyContact>(
      'scoutnationalsonsitemergencycontact'
    );
  const usePersistedOffSiteEmergencyContactState =
    createPersistedState<EmergencyContact>(
      'scoutnationalsoffsitemergencycontact'
    );

  const [allEntries, setAllEntries] = usePersistedEntriesState(
    [] as IndividualEntry[]
  );
  const [campBooking, setCampBooking] =
    usePersistedCampBookingState(EmptyCampBooking);
  const [onSiteEmergencyContact, setOnSiteEmergencyContact] =
    usePersistedOnSiteEmergencyContactState(EmptyEmergencyContact);
  const [offSiteEmergencyContact, setOffSiteEmergencyContact] =
    usePersistedOffSiteEmergencyContactState(EmptyEmergencyContact);

  const handleReset = useCallback(() => {
    setAllEntries([]);
    setCampBooking(EmptyCampBooking);
    setOnSiteEmergencyContact(EmptyEmergencyContact);
    setOffSiteEmergencyContact(EmptyEmergencyContact);
  }, []);

  const [user, setUser] = useState<any>();
  type SignOutHandlerType = Record<string | number | symbol, any> | undefined;
  // prettier-ignore
  const [signOutHandler, setSignOutHandler] =
    useState<(data?: SignOutHandlerType) => void>(() => { /* Do nothing */ });

  // useEffect(() => {
  //   const getAuthenticatedUser = async () => {
  //     const data = await Auth.currentAuthenticatedUser();
  //     // const data = await directCognitoUserAccess();
  //     setUser(data);
  //   };

  //   getAuthenticatedUser().catch((reason: any) => {
  //     console.error('Auth.currentAuthenticatedUser():');
  //     console.error(reason);
  //   });
  // }, []);

  // Hub.listen('auth', ({ payload: { event, data } }) => {
  //   switch (event) {
  //     case 'signIn':
  //       setUser(data);
  //       console.log('sign in', event, data);
  //       break;
  //     case 'signOut':
  //       setUser(undefined);
  //       console.log('sign out');
  //       break;
  //     default:
  //       console.log('unknown auth event');
  //   }
  // });
  // const { user, initialise: initialiseUserContext } = useUserContext();
  // initialiseUserContext();

  // async function directCognitoUserAccess(): Promise<string | null> {
  //   const poolData = {
  //     UserPoolId: awsExports.aws_user_pools_id,
  //     ClientId: awsExports.aws_user_pools_web_client_id,
  //   };

  //   const userPool = new CognitoUserPool(poolData);

  //   // if (typeof AWSCognito !== 'undefined') {
  //   //   AWSCognito.config.region = _config.cognito.region;
  //   // }

  //   // const cognitoUser = userPool.getCurrentUser();
  //   // if (cognitoUser) {

  //   // }
  //   const authTokenPromise = new Promise<string | null>((resolve, reject) => {
  //     const cognitoUser = userPool.getCurrentUser();
  //     if (cognitoUser) {
  //       cognitoUser.getSession(
  //         (err: Error | null, session: CognitoUserSession | null) => {
  //           if (err) {
  //             reject(err);
  //           } else if (session && !session.isValid()) {
  //             resolve(null);
  //           } else if (session) {
  //             resolve(session.getIdToken().getJwtToken());
  //           }
  //           resolve(null);
  //         }
  //       );
  //     } else {
  //       resolve(null);
  //     }
  //   });

  //   const authToken = await authTokenPromise;
  //   return authToken;
  // }

  const app = (
    <div className="App">
      <TopBar resetHandler={handleReset} />
      <Container maxWidth="sm">
        <pre>
          {user ? JSON.stringify(user, null, 2) : 'No authenicated user'}
        </pre>
        <Button onClick={signOutHandler}>Sign out</Button>
        <Shooters allEntries={allEntries} setAllEntries={setAllEntries} />
        <Camping campBooking={campBooking} setCampBooking={setCampBooking} />
        <EmergencyContacts
          onSiteEmergencyContact={onSiteEmergencyContact}
          setOnSiteEmergencyContact={setOnSiteEmergencyContact}
          offSiteEmergencyContact={offSiteEmergencyContact}
          setOffSiteEmergencyContact={setOffSiteEmergencyContact}
        />
        <Permissions />
        <SaveState
          allEntries={allEntries}
          campBooking={campBooking}
          onSiteEmergencyContact={onSiteEmergencyContact}
          offSiteEmergencyContact={offSiteEmergencyContact}
        />
      </Container>
    </div>
  );

  return (
    <Authenticator>
      {({ signOut, user: theUser }) => {
        setUser(theUser);
        setSignOutHandler(signOut);
        return app;
      }}
    </Authenticator>
  );
}

export default App;
