import * as React from 'react';
import { IndividualEntry } from './IndividualEntry';
import ShootersGroupCard from './ShootersGroupCard';

type ShootersProps = {
  shooters: IndividualEntry[];
};

function buildShootersByScoutGroup(shooters: IndividualEntry[]) {
  const competitorsByScoutGroup: Map<string, IndividualEntry[]> = new Map();

  shooters.forEach((entry) => {
    const { scoutGroup } = entry.shooter;
    const isScoutGroupInMap = competitorsByScoutGroup.has(scoutGroup);
    if (!isScoutGroupInMap) {
      competitorsByScoutGroup.set(scoutGroup, []);
    }
    const scoutGroupCompetitors = competitorsByScoutGroup.get(scoutGroup);
    if (scoutGroupCompetitors != null) {
      scoutGroupCompetitors.push(entry);
    }
  });
  return competitorsByScoutGroup;
}

function ShootersList({ shooters }: ShootersProps): JSX.Element {
  const competitorsByScoutGroup = buildShootersByScoutGroup(shooters);

  const elementsToReturn: JSX.Element[] = [];

  competitorsByScoutGroup.forEach((shootersInGroup, scoutGroup) => {
    elementsToReturn.push(
      <ShootersGroupCard
        scoutGroupName={scoutGroup}
        shootersInGroup={shootersInGroup}
      />
    );
  });

  return <>{elementsToReturn}</>;
}

export default ShootersList;
