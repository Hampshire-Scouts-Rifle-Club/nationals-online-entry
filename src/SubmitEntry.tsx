import { Alert, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { EntryState } from './EntryDatabaseRecord';
import { TeamEntry } from './TeamEntry';
import { Permissions } from './Permissions';

interface SubmitEntryProps {
  entryStatus: EntryState;
  onSubmitEntry: () => void;
  onAmendEntry: () => void;
  onDiscardChanges: () => void;
  teamEntry: TeamEntry;
}

const baseErrorMessage = 'Please correct the following issues:';
const noEntrantsMessage = 'Enter at least one competitor';
const incompleteEmergencyContactsMessage =
  'Give details of both on-site and off-site emergency contacts';
const allPermissionNotCheckedMessage = 'Agree to all the permissions';

export function SubmitEntry({
  entryStatus,
  onSubmitEntry,
  onAmendEntry,
  onDiscardChanges,
  teamEntry,
}: SubmitEntryProps) {
  const [permissionsState, setPermissionsState] = useState({
    haveSection21Permission: false,
    havePorPermission: false,
    haveGdprPermission: false,
  });

  const allPermissionChecked =
    permissionsState.haveSection21Permission &&
    permissionsState.havePorPermission &&
    permissionsState.haveGdprPermission;
  const hasEntrants = teamEntry.allEntries.length > 0;
  const hasEmergencyContactDetails =
    teamEntry.offSiteEmergencyContact.name.trim().length > 0 &&
    teamEntry.offSiteEmergencyContact.contactNumber.trim().length > 0 &&
    teamEntry.onSiteEmergencyContact.name.trim().length > 0 &&
    teamEntry.onSiteEmergencyContact.contactNumber.trim().length > 0;
  const isEntryValid =
    hasEntrants && hasEmergencyContactDetails && allPermissionChecked;

  const errorMessageElement = buildErrorMessage(
    hasEntrants,
    hasEmergencyContactDetails,
    allPermissionChecked
  );

  const actionElement = buildActionElement(
    entryStatus,
    isEntryValid,
    onSubmitEntry,
    onAmendEntry,
    onDiscardChanges
  );

  const isEditing = entryStatus === 'draft' || entryStatus === 'amending';

  return (
    <Stack spacing={1} paddingBottom={2}>
      {isEditing && (
        <Permissions
          permissionsState={permissionsState}
          setPermissionsState={setPermissionsState}
        />
      )}
      {isEditing && !isEntryValid && (
        <Alert severity="warning">{errorMessageElement}</Alert>
      )}
      {actionElement}
    </Stack>
  );
}

function buildActionElement(
  entryStatus: EntryState,
  isEntryValid: Boolean,
  onSubmitEntry: () => void,
  onAmendEntry: () => void,
  onDiscardChanges: () => void
) {
  switch (entryStatus) {
    case 'draft':
      return (
        <>
          <Button
            variant="contained"
            disabled={!isEntryValid}
            onClick={onSubmitEntry}
          >
            Submit Entry
          </Button>
          <Typography align="center">
            <em>You can amend your entry up to the closing date.</em>
          </Typography>
        </>
      );
    case 'amending':
      return (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            disabled={!isEntryValid}
            onClick={onAmendEntry}
          >
            Amend Entry
          </Button>
          <Button variant="text" onClick={onDiscardChanges}>
            Discard Changes
          </Button>
        </Stack>
      );
    default:
      return <div />;
  }
}

function buildErrorMessage(
  hasEntrants: boolean,
  hasEmergencyContactDetails: boolean,
  allPermissionChecked: Boolean
) {
  const noEntrantsElement = hasEntrants ? (
    <div />
  ) : (
    <li>{noEntrantsMessage}</li>
  );
  const incompleteEmergencyContactsElement = hasEmergencyContactDetails ? (
    <div />
  ) : (
    <li>{incompleteEmergencyContactsMessage}</li>
  );
  const allPermissionNotCheckedElement = allPermissionChecked ? (
    <div />
  ) : (
    <li>{allPermissionNotCheckedMessage}</li>
  );
  const errorMessageElement = (
    <>
      {baseErrorMessage}
      <ul>
        {noEntrantsElement}
        {incompleteEmergencyContactsElement}
        {allPermissionNotCheckedElement}
      </ul>
    </>
  );
  return errorMessageElement;
}
