import { TeamEntry } from './TeamEntry';

export interface EntryDatabaseRecord {
  id: string;
  owner: string;
  state: 'draft' | 'submitted' | 'amending' | 'superseded';
  updatedAt?: Date; // This is populated by the server
  teamEntry: TeamEntry;
}

export const currentCompetitionYear = '2022';

export function buildEntryRecord(email: string, teamEntry: TeamEntry) {
  const state = 'draft';
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
  state: string,
  year = currentCompetitionYear
) {
  return `${email}-${state}-${year}`;
}
