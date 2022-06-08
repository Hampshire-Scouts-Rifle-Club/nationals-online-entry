import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import createPersistedState from 'use-persisted-state';
import { Auth, Hub } from 'aws-amplify';
import { Alert, Collapse } from '@mui/material';
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
import { readEntryState } from './ServerState';
import { buildEntryId } from './EntryDatabaseRecord';
import { TeamEntry } from './TeamEntry';
import { SignInPrompt } from './SignInPrompt';
import { SubmitEntry } from './SubmitEntry';
import { useInterval } from './useInterval';

const abortController = new AbortController();
const isDev = () =>
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

  const [isEntryLocked] = useState(false);

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
  const [initialServerTeamEntry, setInitialServerTeamEntry] =
    useState<TeamEntry>();

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

  const initialiseUser = useCallback(async () => {
    try {
      setUserData(await getUser());
    } catch (reason: any) {
      setError(reason);
    }
  }, [getUser]);

  useEffect(() => {
    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
        case 'tokenRefresh':
          setUserData(await getUser());
          break;
        case 'signOut':
        case 'oAuthSignOut':
          setUserData(undefined);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
        default:
          setError(data);
          break;
      }
    });

    initialiseUser();
  }, [getUser, initialiseUser]);

  // Refresh our auth token every 10 minutes
  const authTokenRefreshIntervalMs = 10 * 60 * 1000; // 10 minutes
  useInterval(() => initialiseUser(), authTokenRefreshIntervalMs);

  const readInitialState = useCallback(
    async (ownerEmail: string, authToken: string, abortSignal: AbortSignal) => {
      try {
        const initialTeamEntry = await getInitialState(
          ownerEmail,
          authToken,
          abortSignal
        );
        setInitialServerTeamEntry(initialTeamEntry);
      } catch (readError: any) {
        if (readError.message !== 'canceled') {
          const moreDescriptiveError = new Error(
            `getInitialState: ${readError.message}`
          );
          setError(moreDescriptiveError);
        }
      }
    },
    []
  );

  const populateInitialState = useCallback(
    (teamEntry: TeamEntry) => {
      const {
        allEntries: serverAllEntries,
        campBooking: serverCampBooking,
        onSiteEmergencyContact: serverOnSiteEmergencyContact,
        offSiteEmergencyContact: serverOffSiteEmergencyContact,
      } = teamEntry;

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

      setIsReadyToSaveState(true);
    },
    [
      setAllEntries,
      setCampBooking,
      setOffSiteEmergencyContact,
      setOnSiteEmergencyContact,
    ]
  );

  const ownerEmail = authUserData?.signInUserSession?.idToken?.payload?.email;
  const authToken = authUserData?.signInUserSession?.idToken?.jwtToken;
  const isNotAuthenticated =
    !ownerEmail ||
    !authToken ||
    ownerEmail.length === 0 ||
    authToken.length === 0;
  const isAlreadyInitialised = initialServerTeamEntry !== undefined;
  const isWaitingForData = !isNotAuthenticated && !isAlreadyInitialised;

  /**
   * Gets the initial data from the server. Will run on every render,
   * so exits early if not authenticated or we've already got the data.
   */
  useEffect(() => {
    if (isNotAuthenticated || isAlreadyInitialised) {
      return;
    }

    // It is important that readInitialState only has one side
    // effect, which is calling setInitialServerTeamEntry, which
    // calling will prevent this effect from running again.
    readInitialState(ownerEmail, authToken, abortController.signal);

    // We are not returning a clean-up function that allows readInitialState to be aborted.
    // The initialisation goes wrong when we do.
    // return () => {
    //   abortController.abort();
    // };
  });

  /**
   * Populates the state of the react components, after
   * initialServerTeamEntry has been populated.
   */
  useEffect(() => {
    const isInitialLoadOfData = !isReadyToSaveState && initialServerTeamEntry;
    if (isInitialLoadOfData) {
      populateInitialState(initialServerTeamEntry);
    }
  }, [initialServerTeamEntry, isReadyToSaveState, populateInitialState]);

  return (
    <div className="App">
      <CodeParamRemover />
      <TopBar resetHandler={handleReset} userData={authUserData} />
      <Container maxWidth="sm">
        {isDev() && error !== undefined && (
          <Alert severity="error" onClose={() => setError(undefined)}>
            {error.message}
          </Alert>
        )}
        <Collapse
          in={error && error.message === 'The user is not authenticated'}
        >
          <SignInPrompt />
        </Collapse>
        <Shooters
          allEntries={allEntries}
          setAllEntries={(newAllEntries) => setAllEntries(newAllEntries)}
          showPlaceHolder={isWaitingForData}
          isEntryLocked={isEntryLocked}
        />
        <Camping
          campBooking={campBooking}
          setCampBooking={(newCampBooking) => setCampBooking(newCampBooking)}
          showPlaceHolder={isWaitingForData}
          isEntryLocked={isEntryLocked}
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
          showPlaceHolder={isWaitingForData}
          isEntryLocked={isEntryLocked}
        />
        <Permissions />
        <SubmitEntry />
        {isReadyToSaveState && initialServerTeamEntry && (
          <SaveState
            allEntries={allEntries}
            campBooking={campBooking}
            onSiteEmergencyContact={onSiteEmergencyContact}
            offSiteEmergencyContact={offSiteEmergencyContact}
            authToken={authToken}
            ownerEmail={ownerEmail}
            initialServerState={initialServerTeamEntry}
          />
        )}
      </Container>
    </div>
  );
}

async function getInitialState(
  ownerEmail: string,
  authToken: string,
  abortSignal: AbortSignal
): Promise<TeamEntry | undefined> {
  try {
    const id = buildEntryId(ownerEmail, 'draft');
    const entryRecord = await readEntryState(authToken, id, abortSignal);

    if (entryRecord && entryRecord.teamEntry) {
      return entryRecord.teamEntry;
    }
  } catch (error: any) {
    if (error.message !== 'canceled') {
      throw error;
    }
  }

  return undefined;
}
