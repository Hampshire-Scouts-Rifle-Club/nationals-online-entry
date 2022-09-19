import { calculateAge } from './AgeUtils';
import {
  BaseEntryCost,
  CompetitionDate,
  RoDiscount,
} from './CompetitionConstants';
import { Shooter } from './Shooter';
import { AllEvents } from './AllEvents';
import { EntryDatabaseRecord } from './EntryDatabaseRecord';
import { sumCost } from './EventsSummaryBuilder';
import { IndividualEntry } from './IndividualEntry';
import { ShootingEvent } from './ShootingEvent';

const shooterColumnHeadings = [
  'First Name',
  'Last Name',
  'Date Of Birth',
  'Age on Competition Day',
  '2019 Competitor Number',
  'Scout Group',
  'County',
  'Is RO',
];

export function flattenAllEntriesToCsv(
  allEntries: EntryDatabaseRecord[]
): string {
  const flatAllEntries = flattenAllEntries(allEntries);
  const dataRows = flatAllEntries.map((value) => value.join());
  const columnHeadings = getColumnHeadings().join();
  return [columnHeadings, ...dataRows].join('\n');
}

export function flattenAllEntries(allEntries: EntryDatabaseRecord[]) {
  const flatAllEntries = allEntries.flatMap((entryRecord) => {
    const { owner, teamEntry } = entryRecord;
    const flatTeamEntries = teamEntry.allEntries.map((entry) => [
      owner,
      ...flattenEntry(entry.shooter, entry.enteredEventIds),
    ]);
    return flatTeamEntries;
  });
  return flatAllEntries;
}

export function getTeamDetailsCsv(allEntries: EntryDatabaseRecord[]) {
  const dataRows = getTeamDetails(allEntries).map((teamDetails) =>
    teamDetails.join()
  );
  const columnHeadings = [
    'Owner',
    'Number of Campers',
    'Estimated Arrival Time',
    'Any Other Info',
    'On-site Emergency Contact Name',
    'On-site Emergency Contact Number',
    'Off-site Emergency Contact Name',
    'Off-site Emergency Contact Number',
    'Total Cost',
  ].join();

  return [columnHeadings, ...dataRows].join('\n');
}

export function getTeamDetails(allEntries: EntryDatabaseRecord[]): string[][] {
  return allEntries.map((entry) => [
    entry.owner,
    entry.teamEntry.campBooking.numberOfCampers.toString(),
    `"${entry.teamEntry.campBooking.estimatedArrivalTime}"`,
    `"${entry.teamEntry.campBooking.anyOtherInfo}"`,
    entry.teamEntry.onSiteEmergencyContact.name,
    entry.teamEntry.onSiteEmergencyContact.contactNumber,
    entry.teamEntry.offSiteEmergencyContact.name,
    entry.teamEntry.onSiteEmergencyContact.contactNumber,
    sumTeamCosts(entry.teamEntry.allEntries).toString(),
  ]);
}

function getColumnHeadings() {
  const eventIds = AllEvents.map((event) => event.id);

  return ['Owner', ...shooterColumnHeadings, eventIds, 'Expected Cost'];
}

function flattenEventsEntered(enteredEventIds: string[]): string[] {
  const flatEventsEntered = AllEvents.map((event) => {
    const isEventEntered = enteredEventIds.includes(event.id);
    return isEventEntered ? 'Y' : '';
  });

  return flatEventsEntered;
}

function flattenEntry(shooter: Shooter, enteredEventIds: string[]): string[] {
  const eventsEntered = AllEvents.filter((event) =>
    enteredEventIds.includes(event.id)
  );

  const ageOnCompetitionDay = calculateAge(
    new Date(shooter.dateOfBirth),
    CompetitionDate
  );

  const expectedCost = individualCost(
    eventsEntered,
    shooter.isRangeOfficer
  ).toString();

  const isoDateOfBirth = shooter.dateOfBirth ?? '';
  const dateOfBirthParts = isoDateOfBirth.split('T');
  const dateOfBirth = dateOfBirthParts[0];
  const shooterDetails = [
    shooter.firstName,
    shooter.lastName,
    dateOfBirth,
    ageOnCompetitionDay.toString(),
    `"${shooter.previousCompetitorNumber}"`,
    `"${shooter.scoutGroup}"`,
    shooter.county,
    shooter.isRangeOfficer ? 'RO' : '',
  ];

  const flatEventsEntered = flattenEventsEntered(enteredEventIds);

  return [...shooterDetails, ...flatEventsEntered, expectedCost];
}
function individualCost(
  eventsEntered: ShootingEvent[],
  applyRoDiscount: boolean
) {
  const discount = applyRoDiscount ? RoDiscount : 0;

  return BaseEntryCost + sumCost(eventsEntered) - discount;
}

function sumTeamCosts(allTeamEntries: IndividualEntry[]): number {
  const allIndividualCosts = allTeamEntries.map((entry) => {
    const eventsEntered = AllEvents.filter((event) =>
      entry.enteredEventIds.includes(event.id)
    );
    return individualCost(eventsEntered, entry.shooter.isRangeOfficer);
  });

  const teamCost = allIndividualCosts.reduce(
    (previousSum, cost) => previousSum + cost,
    0
  );

  return teamCost;
}
