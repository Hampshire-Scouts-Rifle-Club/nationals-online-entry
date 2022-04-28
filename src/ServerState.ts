import axios from 'axios';

export async function writeEntryState(
  entryRecordJson: string,
  authorizationToken: string,
  abortSignal: AbortSignal
): Promise<void> {
  const putUrl = 'https://hx8lk8jh57.execute-api.eu-west-1.amazonaws.com/entry';

  const headers = {
    Authorization: authorizationToken,
    'Content-Type': 'application/json',
  };

  await axios.put(putUrl, entryRecordJson, {
    headers,
    signal: abortSignal,
    timeout: 3000,
  });
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
export async function readEntryState(
  authorizationToken: string,
  id: string,
  abortSignal: AbortSignal
): Promise<string> {
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
    timeout: 3000,
  });

  return response.data;
}
