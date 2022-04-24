import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
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

  const haveAuthToken = authToken !== undefined && authToken.trim().length > 0;
  const haveOwnerEmail =
    ownerEmail !== undefined && ownerEmail.trim().length > 0;
  const canSaveToApi = haveAuthToken && haveOwnerEmail;

  const [savedEntryRecord, setSavedEntryRecord] = useState('');

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
        await axios.put(putUrl, entryRecordJson, {
          headers,
          signal: abortController.signal,
        });

        setSavedEntryRecord(entryRecordJson);
        setError(undefined);
      } catch (reason: any) {
        setError(reason);
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  // Will run on every render
  useEffect(() => {
    if (!canSaveToApi) return () => {};

    const entryRecordJson = buildEntryRecord(ownerEmail ?? '', teamEntry);

    const writeOut = async () => {
      if (savedEntryRecord !== entryRecordJson) {
        await writeStateToApi(entryRecordJson, authToken);
      }
    };
    writeOut();

    return () => abortController.abort();
  });

  const teamEntryJson = JSON.stringify(teamEntry, null, 2);

  const saveStateText = isSaving ? 'Saving...' : 'Saved';
  const saveStateElement = error ? (
    <ErrorBox error={error} />
  ) : (
    <Typography>{saveStateText}</Typography>
  );

  return (
    <>
      {canSaveToApi && saveStateElement}
      {!canSaveToApi && <Typography>Log in to save</Typography>}
      <pre>{teamEntryJson}</pre>;
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
