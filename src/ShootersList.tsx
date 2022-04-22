import * as React from 'react';
import { IndividualEntry } from './IndividualEntry';
import { ShootersGroup } from './ShootersGroup';

type ShootersProps = {
  shooters: IndividualEntry[];
  handleEdit: (entry: IndividualEntry) => void;
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

export function ShootersList({
  shooters,
  handleEdit,
}: ShootersProps): JSX.Element {
  const competitorsByScoutGroup = buildShootersByScoutGroup(shooters);

  const elementsToReturn: JSX.Element[] = [];

  competitorsByScoutGroup.forEach((shootersInGroup, scoutGroup) => {
    const groupKey = scoutGroup;
    elementsToReturn.push(
      <ShootersGroup
        scoutGroupName={scoutGroup}
        shootersInGroup={shootersInGroup}
        key={groupKey}
        handleEdit={handleEdit}
      />
    );
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{elementsToReturn}</>;
}
