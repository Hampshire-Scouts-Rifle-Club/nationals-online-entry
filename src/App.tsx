import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import createPersistedState from 'use-persisted-state';
import { Auth, Hub } from 'aws-amplify';
// eslint-disable-next-line
import { useSearchParams } from 'react-router-dom';
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

// const isDev = () =>
//   !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

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
  const usePersistedFakeUserDataState = createPersistedState<any>(
    'scoutnationalsfakeuserdata'
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
  const [fakeUserData, setFakeUserData] = usePersistedFakeUserDataState();

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
  const [error, setError] = useState<Error>();

  // const [searchParams] = useSearchParams();
  // const showDevControls = searchParams.get('dev') !== null;

  const getUser = useCallback(async () => {
    if (fakeUserData) return fakeUserData;

    try {
      const userData = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      return userData;
    } catch (reason: any) {
      throw new Error(reason);
    }
  }, [fakeUserData]);

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

    const initialiseUser = async () => {
      try {
        setUserData(await getUser());
      } catch (reason: any) {
        setError(reason);
        // if (isDev()) {
        //   setUserData(JSON.parse(fakeUserData));
        // }
      }
    };
    initialiseUser();
  }, [getUser]);

  const handleSetUserData = useCallback(
    (userData: any) => {
      setFakeUserData(userData);
      // setError(undefined);
    },
    [setFakeUserData]
  );

  const ownerEmail = authUserData?.signInUserSession?.idToken?.payload?.email;
  const authToken = authUserData?.signInUserSession?.idToken?.jwtToken;

  console.log('Rendering App');

  return (
    <div className="App">
      <CodeParamRemover />
      <TopBar
        resetHandler={handleReset}
        userData={authUserData}
        setUserData={handleSetUserData}
        errorHandler={(newError: any) => setError(newError)}
      />
      {error !== undefined && <ErrorBox error={error} />}
      <Container maxWidth="sm">
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
          authToken={authToken}
          ownerEmail={ownerEmail}
        />
      </Container>
    </div>
  );
}
