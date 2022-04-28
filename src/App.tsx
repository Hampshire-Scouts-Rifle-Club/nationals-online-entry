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
import { readEntryState } from './ServerState';
import { buildEntryId } from './EntryDatabaseRecord';

const abortController = new AbortController();

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
  const [error, setError] = useState<Error>();
  const [isReadyToSaveState, setIsReadyToSaveState] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      return userData;
    } catch (reason: any) {
      throw new Error(reason);
    }
  }, []);

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
      }
    };
    initialiseUser();
  }, [getUser]);

  const handleLogOut = useCallback(async () => {
    // This next line automatically redirects to a log out URL, so
    // everything could get unmounted and we start from fresh.
    await Auth.signOut();
    // TODO: if google or facebook login then also call their logout URLs
  }, []);

  const ownerEmail = authUserData?.signInUserSession?.idToken?.payload?.email;
  const authToken = authUserData?.signInUserSession?.idToken?.jwtToken;

  useEffect(() => {
    if (
      !ownerEmail ||
      !authToken ||
      ownerEmail.length === 0 ||
      authToken.length === 0
    ) {
      return () => {};
    }
    // If we get here then ownerEmail and authToken have been populated,
    // or changed. (I'll not worry about changed for now) We read the data
    // from the server, populate the local state, and enable saving the state
    // on the server.

    const getInitialState = async () => {
      try {
        const id = buildEntryId(ownerEmail, 'draft');
        const entryRecord = await readEntryState(
          authToken,
          id,
          abortController.signal
        );

        if (entryRecord && entryRecord.teamEntry) {
          const {
            allEntries: serverAllEntries,
            campBooking: serverCampBooking,
            onSiteEmergencyContact: serverOnSiteEmergencyContact,
            offSiteEmergencyContact: serverOffSiteEmergencyContact,
          } = entryRecord.teamEntry;
          if (serverAllEntries) {
            setAllEntries(serverAllEntries);
          }
          if (serverCampBooking) {
            setCampBooking(serverCampBooking);
          }
          if (serverOnSiteEmergencyContact) {
            setOnSiteEmergencyContact(serverOnSiteEmergencyContact);
          }
          if (serverOffSiteEmergencyContact) {
            setOffSiteEmergencyContact(serverOffSiteEmergencyContact);
          }
        }
        setIsReadyToSaveState(true);
      } catch (readError: any) {
        if (readError.message !== 'canceled') {
          const moreDescriptiveError = new Error(
            `getInitialState: ${readError.message}`
          );
          setError(moreDescriptiveError);
        }
      }
    };
    getInitialState();

    // If we get unmounted we need to abort the API call
    return () => abortController.abort();
  }, [
    ownerEmail,
    authToken,
    setAllEntries,
    setCampBooking,
    setOnSiteEmergencyContact,
    setOffSiteEmergencyContact,
  ]);

  return (
    <div className="App">
      <CodeParamRemover />
      <TopBar
        resetHandler={handleReset}
        userData={authUserData}
        handleSignOut={handleLogOut}
      />
      {error !== undefined && <ErrorBox error={error} />}
      <Container maxWidth="sm">
        <Shooters
          allEntries={allEntries}
          setAllEntries={(newAllEntries) => setAllEntries(newAllEntries)}
        />
        <Camping
          campBooking={campBooking}
          setCampBooking={(newCampBooking) => setCampBooking(newCampBooking)}
        />
        <EmergencyContacts
          onSiteEmergencyContact={onSiteEmergencyContact}
          setOnSiteEmergencyContact={(newOnSitEmergencyContact) =>
            setOnSiteEmergencyContact(newOnSitEmergencyContact)
          }
          offSiteEmergencyContact={offSiteEmergencyContact}
          setOffSiteEmergencyContact={(newOffSitEmergencyContact) =>
            setOffSiteEmergencyContact(newOffSitEmergencyContact)
          }
        />
        <Permissions />
        {isReadyToSaveState && (
          <SaveState
            allEntries={allEntries}
            campBooking={campBooking}
            onSiteEmergencyContact={onSiteEmergencyContact}
            offSiteEmergencyContact={offSiteEmergencyContact}
            authToken={authToken}
            ownerEmail={ownerEmail}
          />
        )}
      </Container>
    </div>
  );
}
