import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import createPersistedState from 'use-persisted-state';
import { Auth, Hub } from 'aws-amplify';
import { Alert, Box, Collapse, Link, Typography } from '@mui/material';
import { Shooters } from './Shooters';
import { Camping } from './Camping';
import { EmergencyContacts } from './EmergencyContacts';
import { TopBar } from './TopBar';
import { CampBooking, EmptyCampBooking } from './CampBooking';
import { EmergencyContact, EmptyEmergencyContact } from './EmergencyContact';
import { IndividualEntry } from './IndividualEntry';
import { SaveState } from './SaveState';
import { CodeParamRemover } from './CodeParamRemover';
import {
  amendSubmittedEntry,
  deleteEntry,
  readEntry,
  writeEntry,
} from './ServerState';
import {
  buildEntryId,
  buildEntryRecord,
  EntryState,
} from './EntryDatabaseRecord';
import { TeamEntry } from './TeamEntry';
import { SignInPrompt } from './SignInPrompt';
import { SubmitEntry } from './SubmitEntry';
import { useInterval } from './useInterval';
import { SubmittedInfoAlert } from './SubmittedInfoAlert';
import { AmendingInfoAlert } from './AmendingInfoAlert';
import {
  // EntryClosingDate,
  logoImage,
  logoImageAltText,
} from './CompetitionConstants';

const abortController = new AbortController();
const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
// const currentUTCDate = new Date(Date.now());
// const isEntryOpen = currentUTCDate < EntryClosingDate;

export function App(): JSX.Element {
  const usePersistedEntriesState = createPersistedState<IndividualEntry[]>(
    'scoutnationalsentries2023'
  );
  const usePersistedCampBookingState = createPersistedState<CampBooking>(
    'scoutnationalscampbooking2023'
  );
  const usePersistedOnSiteEmergencyContactState =
    createPersistedState<EmergencyContact>(
      'scoutnationalsonsitemergencycontact2023'
    );
  const usePersistedOffSiteEmergencyContactState =
    createPersistedState<EmergencyContact>(
      'scoutnationalsoffsitemergencycontact2023'
    );
  const [isEntryOpen, setIsEntryOpen] = useState(false);
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
  const [entryStatus, setEntryStatus] = useState<EntryState>('draft');
  const [initialServerEntryStatus, setInitialServerEntryStatus] =
    useState<EntryState>();
  const [submittedEntryDate, setSubmittedEntryDate] = useState<Date>();

  const isEntryLocked = !isEntryOpen || entryStatus === 'submitted';

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
      const userData = await getUser();
      setUserData(userData);
      const ownerEmail = userData?.signInUserSession?.idToken?.payload?.email;
      setIsEntryOpen(ownerEmail === 'julie_plumpton@yahoo.co.uk');
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
        const [amendingTeamEntry] = await getEntryFromServer(
          ownerEmail,
          authToken,
          'amending',
          abortSignal
        );
        const [submittedTeamEntry, submittedDateUpdated] =
          await getEntryFromServer(
            ownerEmail,
            authToken,
            'submitted',
            abortSignal
          );
        const [draftTeamEntry] = await getEntryFromServer(
          ownerEmail,
          authToken,
          'draft',
          abortSignal
        );

        const teamEntryInLocalStorage: TeamEntry = {
          allEntries,
          campBooking,
          onSiteEmergencyContact,
          offSiteEmergencyContact,
        };

        const teamEntryIfModificationAllowed =
          amendingTeamEntry ??
          submittedTeamEntry ??
          draftTeamEntry ??
          teamEntryInLocalStorage;

        const teamEntryIfEntriesClosed =
          submittedTeamEntry ?? draftTeamEntry ?? teamEntryInLocalStorage;

        const initialTeamEntry = isEntryOpen
          ? teamEntryIfModificationAllowed
          : teamEntryIfEntriesClosed;
        setInitialServerTeamEntry(initialTeamEntry);

        let newEntryStatus: EntryState = 'draft';
        const isSubmitted = Boolean(submittedTeamEntry);
        newEntryStatus = isSubmitted ? 'submitted' : newEntryStatus;
        const isAmending = Boolean(amendingTeamEntry) && isEntryOpen;
        newEntryStatus = isAmending ? 'amending' : newEntryStatus;

        setEntryStatus(newEntryStatus);
        setInitialServerEntryStatus(newEntryStatus);
        setSubmittedEntryDate(submittedDateUpdated);
      } catch (readError: any) {
        if (readError.message !== 'canceled') {
          const moreDescriptiveError = new Error(
            `getInitialState: ${readError.message}`
          );
          setError(moreDescriptiveError);
        }
      }
    },
    [
      allEntries,
      campBooking,
      isEntryOpen,
      offSiteEmergencyContact,
      onSiteEmergencyContact,
    ]
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
  const givenName =
    authUserData?.signInUserSession?.idToken?.payload?.given_name;
  const familyName =
    authUserData?.signInUserSession?.idToken?.payload?.family_name;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fullName = authUserData?.signInUserSession?.idToken?.payload?.name;
  if (givenName || familyName || fullName) {
    console.log(`User is ${givenName} ${familyName} (${fullName})`);
  } else if (ownerEmail) {
    console.log(`User is ${ownerEmail}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fullName2 =
    givenName && familyName ? `${givenName} ${familyName}` : null;

  const isNotAuthenticated =
    !ownerEmail ||
    !authToken ||
    ownerEmail.length === 0 ||
    authToken.length === 0;
  const isAlreadyInitialised = initialServerTeamEntry !== undefined;
  const isWaitingForData = !isNotAuthenticated && !isAlreadyInitialised;

  const discardEntryChanges = useCallback(async () => {
    try {
      const amendingEntryId = buildEntryId(ownerEmail, 'amending');
      await deleteEntry(authToken, amendingEntryId);
      window.location.reload();
    } catch (deleteError: any) {
      setError(deleteError);
    }
  }, [authToken, ownerEmail]);

  const amendEntry = useCallback(async () => {
    const teamEntry: TeamEntry = {
      allEntries,
      campBooking,
      onSiteEmergencyContact,
      offSiteEmergencyContact,
    };
    const entryRecord = buildEntryRecord(ownerEmail, 'submitted', teamEntry);
    try {
      await amendSubmittedEntry(entryRecord, authToken, abortController.signal);
      window.location.reload();
    } catch (amendEntryError: any) {
      setError(amendEntryError);
    }
  }, [
    allEntries,
    authToken,
    campBooking,
    offSiteEmergencyContact,
    onSiteEmergencyContact,
    ownerEmail,
  ]);

  const submitEntry = useCallback(async () => {
    const teamEntry: TeamEntry = {
      allEntries,
      campBooking,
      onSiteEmergencyContact,
      offSiteEmergencyContact,
    };
    const entryRecord = buildEntryRecord(ownerEmail, 'submitted', teamEntry);
    try {
      await writeEntry(entryRecord, authToken, abortController.signal);
      window.location.reload();
    } catch (submitError: any) {
      setError(submitError);
    }
  }, [
    allEntries,
    authToken,
    campBooking,
    offSiteEmergencyContact,
    onSiteEmergencyContact,
    ownerEmail,
  ]);

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
      <Container maxWidth="md">
        <Box textAlign="center">
          <Link href="https://www.nationalscoutriflechampionships.org.uk">
            <img
              src={logoImage}
              alt={logoImageAltText}
              style={{ width: '192px' }}
            />
          </Link>
        </Box>
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
        {entryStatus === 'submitted' && (
          <SubmittedInfoAlert
            date={submittedEntryDate}
            onAmend={() => setEntryStatus('amending')}
            areEntriesClosed={!isEntryOpen}
          />
        )}
        {entryStatus === 'amending' && (
          <AmendingInfoAlert
            date={submittedEntryDate}
            onDiscardChanges={discardEntryChanges}
          />
        )}
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
        <SubmitEntry
          entryStatus={entryStatus}
          onSubmitEntry={submitEntry}
          onAmendEntry={amendEntry}
          onDiscardChanges={discardEntryChanges}
          teamEntry={{
            allEntries,
            campBooking,
            onSiteEmergencyContact,
            offSiteEmergencyContact,
          }}
          isSignedIn={!isNotAuthenticated}
        />
        {isReadyToSaveState && initialServerTeamEntry && (
          <SaveState
            allEntries={allEntries}
            campBooking={campBooking}
            onSiteEmergencyContact={onSiteEmergencyContact}
            offSiteEmergencyContact={offSiteEmergencyContact}
            authToken={authToken}
            ownerEmail={ownerEmail}
            initialServerState={initialServerTeamEntry}
            entryStatus={entryStatus}
            initialServerEntryStatus={initialServerEntryStatus}
          />
        )}
        <Box textAlign="right">
          <Typography variant="body2" paddingBottom="2rem">
            <Link
              href="https://hampshirescouts.org.uk/privacy-policy/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </Typography>
        </Box>
        <Typography variant="body2">
          {'For support with this site please email John Holcroft: '}
          <Link href="mailto:john-nsrc@montreux.co.uk">
            john-nsrc@montreux.co.uk
          </Link>
        </Typography>
        <Typography variant="body2" paddingBottom="2rem">
          {`For support with the competition please email: `}
          <Link href="mailto:championships@hampshirescoutrifleclub.org.uk">
            championships@hampshirescoutrifleclub.org.uk
          </Link>
        </Typography>
      </Container>
    </div>
  );
}

async function getEntryFromServer(
  ownerEmail: string,
  authToken: string,
  state: EntryState,
  abortSignal: AbortSignal
): Promise<[TeamEntry, Date] | [undefined, undefined]> {
  try {
    const id = buildEntryId(ownerEmail, state);
    const entryRecord = await readEntry(authToken, id, abortSignal);

    if (entryRecord && entryRecord.teamEntry && entryRecord.updated) {
      const updatedDate = new Date(entryRecord.updated);
      return [entryRecord.teamEntry, updatedDate];
    }
  } catch (error: any) {
    const isBadRequest = error.response.status === 400;
    const wasCancelled = error.message === 'canceled';
    const shouldIgnoreError = isBadRequest || wasCancelled;
    if (!shouldIgnoreError) {
      throw error;
    }
  }

  return [undefined, undefined];
}
