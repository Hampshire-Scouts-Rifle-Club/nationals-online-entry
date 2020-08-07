import * as React from 'react';
import { Shooter } from './Shooter';

type ShootersProps = {
  shooters: Shooter[];
}

function calculateAge(dateOfBirth: Date) {
  const differenceFromNow = Date.now() - dateOfBirth.getTime();
  const ageAsDate = new Date(differenceFromNow);

  return Math.abs(ageAsDate.getUTCFullYear() - 1970);
}

function buildIsRoString(isRangeOfficer: boolean) {
  if (isRangeOfficer) {
    return ', RO';
  }
  return '';
}

function buildShootersByScoutGroup(shooters: Shooter[]) {
  const competitorsByScoutGroup: Map<string, Shooter[]> = new Map();

  shooters.forEach((shooter) => {
    const isScoutGroupInMap = !(competitorsByScoutGroup.get(shooter.scoutGroup) === undefined);
    if (!isScoutGroupInMap) {
      competitorsByScoutGroup.set(shooter.scoutGroup, []);
    }
    const scoutGroupCompetitors = competitorsByScoutGroup.get(shooter.scoutGroup);
    scoutGroupCompetitors!.push(shooter);
  });
  return competitorsByScoutGroup;
}

function buildScoutGroupCompetitorsElement(scoutGroup: string, shootersInGroup: Shooter[]) {
  return (
    <>
      <div className="scout-group-heading">{scoutGroup}</div>
      <ul className="shooters-list">
        {shootersInGroup.map((shooter) => (
          <li key={shooter.id}>
            {shooter.firstName}
            {' '}
            {shooter.lastName}
            {', '}
            {calculateAge(shooter.dateOfBirth).toString()}
            {buildIsRoString(shooter.isRangeOfficer)}
          </li>
        ))}
      </ul>
    </>
  );
}

function ShootersList({ shooters }: ShootersProps) {
  const competitorsByScoutGroup = buildShootersByScoutGroup(shooters);

  const elementsToReturn: JSX.Element[] = [];

  Array.from(competitorsByScoutGroup.entries()).forEach((value) => {
    const scoutGroup = value[0];
    const shootersInGroup = value[1];
    const allCompetitorsElement = buildScoutGroupCompetitorsElement(scoutGroup, shootersInGroup);
    elementsToReturn.push(allCompetitorsElement);
  });

  return (
    <>
      { elementsToReturn }
    </>
  );
}

export default ShootersList;
