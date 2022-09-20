import { expect, test } from '@jest/globals';
import { allEntriesSep19 } from './AllEntriesData2022';
import {
  flattenAllEntriesToCsv,
  getTeamDetailsCsv,
} from './AllEntriesProcessing';
import { EntryDatabaseRecord } from './EntryDatabaseRecord';

test('dump allEntries', () => {
  const allEntries = allEntriesSep19.map((entry) => {
    return {
      id: entry.id,
      owner: entry.owner,
      state: entry.state,
      teamEntry: entry.teamEntry,
      updated: new Date(entry.updated),
    } as EntryDatabaseRecord;
  });
  const csvResult = flattenAllEntriesToCsv(allEntries);
  const csvRows = csvResult.split('\n');

  // console.log(csvResult);

  // expect(csvRows).toHaveLength(535);
  expect(csvRows[0]).toBe(
    'Owner,First Name,Last Name,Date Of Birth,Age on Competition Day,2019 Competitor Number,Scout Group,County,Is RO,knockout,airrifle6yd,airpistol6yd,fieldTarget,turningTarget,beginnerssmallbore,smallbore,beginnerstargetsprint,targetsprint,ownrifle6yd,ownrifle10mopen,ownrifle10msporter,ownpistol,vintagerifle,advancedfieldtarget,3popen,3psporter,Expected Cost'
  );
});

test('dump team details', () => {
  const allEntries = allEntriesSep19.map((entry) => {
    return {
      id: entry.id,
      owner: entry.owner,
      state: entry.state,
      teamEntry: entry.teamEntry,
      updated: new Date(entry.updated),
    } as EntryDatabaseRecord;
  });
  const csvResult = getTeamDetailsCsv(allEntries);
  const csvRows = csvResult.split('\n');

  // console.log(csvResult);

  // expect(csvRows).toHaveLength(64);q
});
