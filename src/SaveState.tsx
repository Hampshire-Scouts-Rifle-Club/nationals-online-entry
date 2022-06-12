import { Alert, Snackbar, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CampBooking } from './CampBooking';
import { EmergencyContact } from './EmergencyContact';
import { buildEntryRecord, EntryState } from './EntryDatabaseRecord';
import { IndividualEntry } from './IndividualEntry';
import { writeEntry } from './ServerState';
import { TeamEntry } from './TeamEntry';

interface SaveStateProps {
  allEntries: IndividualEntry[];
  campBooking: CampBooking;
  onSiteEmergencyContact: EmergencyContact;
  offSiteEmergencyContact: EmergencyContact;
  authToken?: string;
  ownerEmail?: string;
  entryStatus: EntryState;
  initialServerState: TeamEntry;
  initialServerEntryStatus?: EntryState;
}

const abortController = new AbortController();

export function SaveState({
  allEntries,
  campBooking,
  onSiteEmergencyContact,
  offSiteEmergencyContact,
  authToken,
  ownerEmail,
  initialServerState,
  entryStatus,
  initialServerEntryStatus,
}: SaveStateProps): JSX.Element {
  const teamEntry: TeamEntry = {
    allEntries,
    campBooking,
    onSiteEmergencyContact,
    offSiteEmergencyContact,
  };

  const errorRef = useRef<Error>();

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const haveAuthToken = authToken !== undefined && authToken.trim().length > 0;
  const haveOwnerEmail =
    ownerEmail !== undefined && ownerEmail.trim().length > 0;
  const canSaveToApi = haveAuthToken && haveOwnerEmail;
  const shouldSaveToApi = entryStatus === 'draft' || entryStatus === 'amending';

  const newEntryRecordJson = buildEntryRecord(
    ownerEmail ?? '',
    entryStatus,
    teamEntry
  );
  const initialServerEntryRecordJson = buildEntryRecord(
    ownerEmail ?? '',
    initialServerEntryStatus ?? 'unsaved',
    initialServerState
  );
  const savedEntryRecord = useRef(initialServerEntryRecordJson);

  const writeStateToApi = useCallback(
    async (
      entryRecordJson: string,
      authorizationToken: string
    ): Promise<void> => {
      try {
        const success = await writeEntry(
          entryRecordJson,
          authorizationToken,
          abortController.signal
        );

        if (success) {
          savedEntryRecord.current = entryRecordJson;
          errorRef.current = undefined;
          setIsSuccessAlertOpen(true);
        }
      } catch (reason: any) {
        errorRef.current = reason;
        setIsErrorAlertOpen(true);
      }
    },
    []
  );

  // This will run on every render, but only write to the API if
  // the entry has changed. We do not abort a write on an unmount.
  useEffect(() => {
    const upToDate = savedEntryRecord.current === newEntryRecordJson;
    if (!canSaveToApi || !shouldSaveToApi || upToDate) return;

    const writeOut = async () => {
      await writeStateToApi(newEntryRecordJson, authToken);
    };
    writeOut();
  });

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
          {errorRef.current?.message}
        </Alert>
      </Snackbar>
      {!canSaveToApi && <Typography>Log in to save</Typography>}
    </>
  );
}
