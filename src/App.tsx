import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import createPersistedState from 'use-persisted-state';
import { Auth, Hub } from 'aws-amplify';
// eslint-disable-next-line
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Shooters } from './Shooters';
import { Camping } from './Camping';
import { EmergencyContacts } from './EmergencyContacts';
import { Permissions } from './Permissions';
import { TopBar } from './TopBar';
import { CampBooking, EmptyCampBooking } from './CampBooking';
import { EmergencyContact, EmptyEmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import { SaveState } from './SaveState';
import { CodeParamRemover } from './CodeParamRemover';
import { ErrorBox } from './ErrorBox';

export const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export function App(): JSX.Element {
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
  }, [
    setAllEntries,
    setCampBooking,
    setOnSiteEmergencyContact,
    setOffSiteEmergencyContact,
  ]);

  const [authUserData, setUserData] = useState<any>();
  const [error, setError] = useState<any>();
  // const [user, setUser] = useState<any>(null);
  // const [userToken, setUserToken] = useState<any>();
  // const [customState, setCustomState] = useState<any>(null);

  useEffect(() => {
    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          setUserData(await getUser());
          break;
        case 'signOut':
          setUserData(undefined);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
        default:
          setError(data);
          break;
      }
    });

    getUser().then((userData) => {
      setUserData(userData);
    });
  }, []);

  async function getUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      return userData;
    } catch (reason) {
      setError(reason);
      return undefined;
    }
  }

  // function extractUserEmail(userData: any): string {
  //   // Google email path: x.signInUserSession.idToken.payload.email
  //   // Cognito email path: x.signInUserSession.idToken.payload.email
  //   const email =
  //     userData?.signInUserSession?.idToken?.payload?.email ?? 'email not found';

  //   return email;
  // }

  // function extractUserToken(userData: any): string {
  //   // Google email path: x.signInUserSession.idToken.payload.email
  //   // Cognito email path: x.signInUserSession.idToken.payload.email
  //   const idToken =
  //     userData?.signInUserSession?.idToken?.jwtToken ?? 'ID token not found';

  //   return idToken;
  // }

  // const handleSignIn = useCallback(() => {
  //   Auth.federatedSignIn()
  //     .then((newUser) => setUser(newUser))
  //     .catch((reason) => setCustomState(reason));
  // }, []);

  // const handleSignOut = useCallback(() => {
  //   Auth.signOut()
  //     .then((value) => {
  //       setUser(null);
  //       setCustomState(value);
  //     })
  //     .catch((reason) => setCustomState(reason));
  // }, []);

  const appElement = (
    <div className="App">
      <CodeParamRemover />
      <TopBar
        resetHandler={handleReset}
        userData={authUserData}
        setUserData={setUserData}
        errorHandler={setError}
      />
      {error !== undefined && <ErrorBox error={error} />}
      <Container maxWidth="sm">
        {/* {isDev() && (
          <>
            <pre>
              {user ? JSON.stringify(user, null, 2) : 'No authenticated user'}
              {userToken
                ? JSON.stringify(userToken, null, 2)
                : 'No authenticated user'}
            </pre>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(authUserData))
              }
            >
              Copy Authenticated User Data
            </Button>
            <pre>{customState && JSON.stringify(customState, null, 2)}</pre>
          </>
        )} */}
        <Shooters allEntries={allEntries} setAllEntries={setAllEntries} />
        <Camping campBooking={campBooking} setCampBooking={setCampBooking} />
        <EmergencyContacts
          onSiteEmergencyContact={onSiteEmergencyContact}
          setOnSiteEmergencyContact={setOnSiteEmergencyContact}
          offSiteEmergencyContact={offSiteEmergencyContact}
          setOffSiteEmergencyContact={setOffSiteEmergencyContact}
        />
        <Permissions />
        {isDev() && (
          <SaveState
            allEntries={allEntries}
            campBooking={campBooking}
            onSiteEmergencyContact={onSiteEmergencyContact}
            offSiteEmergencyContact={offSiteEmergencyContact}
          />
        )}
      </Container>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={appElement} />
        <Route path="/logout" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
