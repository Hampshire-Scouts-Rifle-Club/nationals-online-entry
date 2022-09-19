import { Alert } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { EntryDatabaseRecord } from './EntryDatabaseRecord';
import { readAllEntries } from './ServerState';
import { ShootersList } from './ShootersList';

const abortController = new AbortController();
const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

interface AllEntrantsReportProps {
  ownerEmail: string;
  authToken: string;
}

export function AllEntrantsReport({
  ownerEmail,
  authToken,
}: AllEntrantsReportProps) {
  const [allEntries, setAllEntries] = useState<EntryDatabaseRecord[]>([]);
  const [error, setError] = useState<Error>();

  const readInitialState = useCallback(
    async (abortSignal: AbortSignal) => {
      try {
        const newAllEntries = await readAllEntries(authToken, abortSignal);
        if (newAllEntries) setAllEntries(newAllEntries);
      } catch (readError: any) {
        if (readError.message !== 'canceled') {
          const moreDescriptiveError = new Error(
            `readAllEntries: ${readError.message}`
          );
          setError(moreDescriptiveError);
        }
      }
    },
    [authToken]
  );

  const isNotAuthenticated =
    !ownerEmail ||
    !authToken ||
    ownerEmail.length === 0 ||
    authToken.length === 0;
  const isAlreadyInitialised = allEntries.length !== 0;

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
    readInitialState(abortController.signal);

    // We are not returning a clean-up function that allows readInitialState to be aborted.
    // The initialisation goes wrong when we do.
    // return () => {
    //   abortController.abort();
    // };
  });

  return (
    <div>
      {isDev() && error !== undefined && (
        <Alert severity="error" onClose={() => setError(undefined)}>
          {error.message}
        </Alert>
      )}
      {allEntries.map((entry) => (
        <ShootersList
          shooters={entry.teamEntry.allEntries}
          handleEdit={() => {}}
          isReadOnly
        />
      ))}
    </div>
  );
}
