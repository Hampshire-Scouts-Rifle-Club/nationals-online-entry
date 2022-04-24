import { Alert, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CampBooking } from './CampBooking';
import { EmergencyContact } from './EmergencyContact';
import { ErrorBox } from './ErrorBox';
import { IndividualEntry } from './IndividualEntry';
import { TeamEntry } from './TeamEntry';

type SaveStateProps = {
  allEntries: IndividualEntry[];
  campBooking: CampBooking;
  onSiteEmergencyContact: EmergencyContact;
  offSiteEmergencyContact: EmergencyContact;
  authToken?: string;
  ownerEmail?: string;
};

const abortController = new AbortController();

export function SaveState({
  allEntries,
  campBooking,
  onSiteEmergencyContact,
  offSiteEmergencyContact,
  authToken,
  ownerEmail,
}: SaveStateProps): JSX.Element {
  const teamEntry: TeamEntry = {
    allEntries,
    campBooking,
    onSiteEmergencyContact,
    offSiteEmergencyContact,
  };
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error>();

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const haveAuthToken = authToken !== undefined && authToken.trim().length > 0;
  const haveOwnerEmail =
    ownerEmail !== undefined && ownerEmail.trim().length > 0;
  const canSaveToApi = haveAuthToken && haveOwnerEmail;

  const savedEntryRecord = useRef('');
  const savingEntryRecord = useRef('');

  const writeStateToApi = useCallback(
    async (
      entryRecordJson: string,
      authorizationToken: string
    ): Promise<void> => {
      const putUrl =
        'https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/entry';

      const headers = {
        Authorization: authorizationToken,
        'Content-Type': 'application/json',
      };

      try {
        savingEntryRecord.current = entryRecordJson;
        setIsSaving(true);

        await axios.put(putUrl, entryRecordJson, {
          headers,
          signal: abortController.signal,
          timeout: 3000,
        });

        savedEntryRecord.current = entryRecordJson;
        setError(undefined);
        setIsSuccessAlertOpen(true);
      } catch (reason: any) {
        if (reason.message !== 'canceled') {
          setError(reason);
          setIsErrorAlertOpen(true);
        }
      } finally {
        savingEntryRecord.current = '';
        setIsSaving(false);
      }
    },
    []
  );

  const entryRecordJson = buildEntryRecord(ownerEmail ?? '', teamEntry);

  // Will run every time entryRecordJson changes
  useEffect(() => {
    if (!canSaveToApi) return () => {};

    const writeOut = async () => {
      if (
        savedEntryRecord.current !== entryRecordJson &&
        savingEntryRecord.current !== entryRecordJson
      ) {
        await writeStateToApi(entryRecordJson, authToken);
      }
    };
    writeOut();

    return () => abortController.abort();
  }, [authToken, canSaveToApi, entryRecordJson, writeStateToApi]);

  const saveStateText = isSaving ? 'Saving...' : 'Saved';
  const saveStateElement = error ? (
    <ErrorBox error={error} />
  ) : (
    <Typography>{saveStateText}</Typography>
  );

  const handleSuccessAlertClose = () => setIsSuccessAlertOpen(false);
  const handleErrorAlertClose = () => setIsErrorAlertOpen(false);

  return (
    <>
      <Snackbar
        open={isSuccessAlertOpen}
        autoHideDuration={1000}
        onClose={handleSuccessAlertClose}
      >
        <Alert
          onClose={handleSuccessAlertClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Saved
        </Alert>
      </Snackbar>
      <Snackbar
        open={isErrorAlertOpen}
        autoHideDuration={3000}
        onClose={handleErrorAlertClose}
      >
        <Alert
          onClose={handleErrorAlertClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
      {canSaveToApi && saveStateElement}
      {!canSaveToApi && <Typography>Log in to save</Typography>}
    </>
  );
}

interface EntryDatabaseRecord {
  id: string;
  owner: string;
  state: 'draft' | 'submitted' | 'amending' | 'superseded';
  updatedAt?: Date; // This is populated by the server
  teamEntry: TeamEntry;
}

function buildEntryRecord(email: string, teamEntry: TeamEntry) {
  const state = 'draft';
  const year = '2022';
  const id = `${email}-${state}-${year}`;

  const entryRecord: EntryDatabaseRecord = {
    id,
    owner: email,
    state,
    teamEntry,
  };
  const entryRecordJson = JSON.stringify(entryRecord);
  return entryRecordJson;
}
