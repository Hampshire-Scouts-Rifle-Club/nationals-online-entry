import { Alert, Button, Stack, Typography } from "@mui/material";
import { EntryState } from "./EntryDatabaseRecord";
import { TeamEntry } from "./TeamEntry";
import { EntryClosingDate } from "./CompetitionConstants";

type SubmitEntryProps = {
  entryStatus: EntryState;
  onSubmitEntry: () => void;
  onAmendEntry: () => void;
  onDiscardChanges: () => void;
  onWithdrawEntry: () => void;
  teamEntry: TeamEntry;
  isSignedIn: boolean;
};

const baseErrorMessage = "To allow the entry to be submitted please:";
const noEntrantsMessage = "Enter at least one competitor";
const notSignedInMessage = "Sign in";
const readyToSubmitMessage = "This entry can be submitted";

export function SubmitEntry({
  entryStatus,
  onSubmitEntry,
  onAmendEntry,
  onDiscardChanges,
  onWithdrawEntry,
  teamEntry,
  isSignedIn,
}: SubmitEntryProps) {
  const hasEntrants = teamEntry.allEntries.length > 0;
  const isEntryValid = hasEntrants && isSignedIn;

  const errorMessageElement = buildErrorMessage(hasEntrants, isSignedIn);

  const actionElement = buildActionElement(
    entryStatus,
    isEntryValid,
    onSubmitEntry,
    onAmendEntry,
    onDiscardChanges,
    onWithdrawEntry
  );

  const isEditing = entryStatus === "draft" || entryStatus === "amending";

  return (
    <Stack spacing={1} paddingBottom={2}>
      {isEditing && !isEntryValid && (
        <Alert severity="warning">{errorMessageElement}</Alert>
      )}
      {isEditing && isEntryValid && (
        <Alert severity="success">{readyToSubmitMessage}</Alert>
      )}
      {actionElement}
    </Stack>
  );
}

function buildActionElement(
  entryStatus: EntryState,
  isEntryValid: boolean,
  onSubmitEntry: () => void,
  onAmendEntry: () => void,
  onDiscardChanges: () => void,
  onWithdrawEntry: () => void
) {
  const closingDateString = EntryClosingDate.toLocaleDateString();

  switch (entryStatus) {
    case "draft":
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
            <em>
              You can amend your entry up to the closing date (
              {closingDateString}).
            </em>
          </Typography>
        </>
      );
    case "amending":
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
          <Button variant="text" onClick={onWithdrawEntry}>
            Withdraw Entry
          </Button>
        </Stack>
      );
    default:
      return <div />;
  }
}

function buildErrorMessage(
  hasEntrants: boolean,

  isSignedIn: boolean
) {
  const buildErrorElement = (hideMessage: boolean, message: string) =>
    hideMessage ? <div /> : <li>{message}</li>;

  const noEntrantsElement = buildErrorElement(hasEntrants, noEntrantsMessage);
  const isSignedInElement = buildErrorElement(isSignedIn, notSignedInMessage);

  const errorMessageElement = (
    <>
      {baseErrorMessage}
      <ul>
        {noEntrantsElement}
        {isSignedInElement}
      </ul>
    </>
  );
  return errorMessageElement;
}
