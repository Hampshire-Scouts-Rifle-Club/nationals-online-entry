import axios from 'axios';
import { EntryDatabaseRecord, EntryState } from './EntryDatabaseRecord';

interface ServerEntryDatabaseRecord extends EntryDatabaseRecord {
  teamEntryJson: string;
}

interface ServerEntryState {
  ownerEmail: string;
  year: string;
  currentEntryState: EntryState;
}

export async function writeEntry(
  entryRecordJson: string,
  authorizationToken: string,
  abortSignal: AbortSignal
): Promise<boolean> {
  const putUrl = 'https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/entry';

  const headers = {
    Authorization: authorizationToken,
    'Content-Type': 'application/json',
  };

  const response = await axios.put(putUrl, entryRecordJson, {
    headers,
    signal: abortSignal,
    timeout: 3000,
  });

  return response.status === 200;
}

export async function amendSubmittedEntry(
  entryRecordJson: string,
  authorizationToken: string,
  abortSignal: AbortSignal
): Promise<boolean> {
  const putUrl =
    'https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/amendentry';

  const headers = {
    Authorization: authorizationToken,
    'Content-Type': 'application/json',
  };

  const response = await axios.put(putUrl, entryRecordJson, {
    headers,
    signal: abortSignal,
    timeout: 3000,
  });

  return response.status === 200;
}

/**
 * Get an entry from the server for the passed ID.
 *
 * @param authorizationToken The JWT/Bearer authorization token
 * @param id The ID of the entry record, in the form <owner email>-<state>-<year>
 * @param abortSignal Signal to abort the read
 * @returns The JSON of an EntryDatabaseRecord
 * @throws On any response from the server that isn't success
 */
export async function readEntry(
  authorizationToken: string,
  id: string,
  abortSignal: AbortSignal
): Promise<EntryDatabaseRecord | undefined> {
  const baseUrl =
    'https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/entry';
  const safeId = encodeURIComponent(id);
  const getUrl = `${baseUrl}/${safeId}`;

  const headers = {
    Authorization: authorizationToken,
  };

  const response = await axios.get(getUrl, {
    headers,
    signal: abortSignal,
    timeout: 5000,
  });

  if (response.status === 400) {
    return undefined;
  }

  const hasReturnedEntryRecord = Boolean(response.data.Item);
  if (!hasReturnedEntryRecord) {
    return undefined;
  }

  const entryRecord = response.data.Item as ServerEntryDatabaseRecord;
  const teamEntry = JSON.parse(entryRecord.teamEntryJson);
  const entryDatabaseRecord = {
    ...entryRecord,
    teamEntry,
  } as EntryDatabaseRecord;
  return entryDatabaseRecord;
}

/**
 * Get the state of an entry from the server for the passed owner.
 *
 * @param authorizationToken The JWT/Bearer authorization token
 * @param ownerEmail The ownerEmail for the entry records
 * @param abortSignal Signal to abort the read
 * @returns "draft" | "submitted" | "amending"
 * @throws On any response from the server that isn't success
 */
export async function readEntryState(
  authorizationToken: string,
  ownerEmail: string,
  abortSignal: AbortSignal
): Promise<ServerEntryState> {
  const baseUrl =
    'https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/entrystate';
  const safeOwnerEmail = encodeURIComponent(ownerEmail);
  const getUrl = `${baseUrl}/${safeOwnerEmail}`;

  const headers = {
    Authorization: authorizationToken,
  };

  const response = await axios.get(getUrl, {
    headers,
    signal: abortSignal,
    timeout: 5000,
  });

  const serverEntryState = response.data as ServerEntryState;
  return serverEntryState;
}

export async function deleteEntry(
  authorizationToken: string,
  id: string
): Promise<void> {
  const baseUrl =
    'https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/entry';
  const safeId = encodeURIComponent(id);
  const deleteUrl = `${baseUrl}/${safeId}`;

  const headers = {
    Authorization: authorizationToken,
  };

  const response = await axios.delete(deleteUrl, {
    headers,
    timeout: 5000,
  });

  if (response.status !== 200) {
    throw new Error(`Delete of entry failed: ${response.statusText}`);
  }
}
