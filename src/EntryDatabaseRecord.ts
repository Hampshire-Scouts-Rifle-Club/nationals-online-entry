import { TeamEntry } from './TeamEntry';

export type EntryState = 'draft' | 'submitted' | 'amending' | 'superseded';

export interface EntryDatabaseRecord {
  id: string;
  owner: string;
  state: EntryState;
  updated?: Date; // This is populated by the server
  teamEntry: TeamEntry;
}

export const currentCompetitionYear = '2022';

export function buildEntryRecord(
  email: string,
  state: EntryState,
  teamEntry: TeamEntry
) {
  const id = buildEntryId(email, state);
  const entryRecord: EntryDatabaseRecord = {
    id,
    owner: email,
    state,
    teamEntry,
  };
  const entryRecordJson = JSON.stringify(entryRecord);
  return entryRecordJson;
}

export function buildEntryId(
  email: string,
  state: EntryState,
  year = currentCompetitionYear
) {
  return `${email}-${state}-${year}`;
}
