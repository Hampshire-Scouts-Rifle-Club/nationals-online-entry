import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import createPersistedState from 'use-persisted-state';
import { Auth, Hub } from 'aws-amplify';
import { Button, Typography } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shooters from './Shooters';
import Camping from './Camping';
import EmergencyContacts from './EmergencyContacts';
import Permissions from './Permissions';
import TopBar from './TopBar';
import { CampBooking, EmptyCampBooking } from './CampBooking';
import { EmergencyContact, EmptyEmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import SaveState from './SaveState';

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

  const [user, setUser] = useState<any>(null);
  const [customState, setCustomState] = useState<any>(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getUser().then((userData) => setUser(extractUserEmail(userData)));
          break;
        case 'cognitoHostedUI':
          getUser().then((userData) => setUser(extractUserEmail(userData)));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
        default:
          setCustomState(data);
          break;
      }
    });

    getUser().then((userData) => setUser(extractUserEmail(userData)));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((userData) => userData)
      .catch((reason) => setCustomState(reason));
  }

  function extractUserEmail(userData: any): string {
    // Google email path: x.signInUserSession.idToken.payload.email
    // Cognito email path: x.signInUserSession.idToken.payload.email
    const email =
      userData?.signInUserSession?.idToken?.payload?.email ?? 'email not found';

    return email;
  }

  const handleSignIn = useCallback(() => {
    Auth.federatedSignIn()
      .then((newUser) => setUser(newUser))
      .catch((reason) => setCustomState(reason));
  }, []);

  const handleSignOut = useCallback(() => {
    Auth.signOut()
      .then((value) => {
        setUser(null);
        setCustomState(value);
      })
      .catch((reason) => setCustomState(reason));
  }, []);

  const appElement = (
    <div className="App">
      <Button onClick={handleSignIn}>Open Hosted UI</Button>
      <Button href="https://auth.nationalscoutriflechampionships.org.uk/oauth2/authorize?client_id=5vl121hntrlpc8veeo43so2m7q&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fentry.nationalscoutriflechampionships.org.uk">
        Open Hosted UI
      </Button>
      {user && <Button onClick={handleSignOut}>Sign Out</Button>}
      <TopBar resetHandler={handleReset} />
      <Container maxWidth="sm">
        <pre>
          {user ? JSON.stringify(user, null, 2) : 'No authenicated user'}
        </pre>
        <pre>{customState && JSON.stringify(customState, null, 2)}</pre>
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={appElement} />
        <Route path="/logout" element={<Typography>Logged out</Typography>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
